param(
  [string]$Root = "public\\images",
  [int]$Quality = 78
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
if (-not $jpegCodec) {
  throw "JPEG codec not found."
}

$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality

$files = Get-ChildItem -Path $Root -Recurse -File -Include *.jpg,*.jpeg |
  Where-Object { $_.Name -notlike '__compress-test*' }

$optimized = 0
$beforeBytes = 0L
$afterBytes = 0L

foreach ($file in $files) {
  $beforeBytes += $file.Length
  $tempPath = "$($file.FullName).opt"

  try {
    $image = [System.Drawing.Image]::FromFile($file.FullName)
    try {
      $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
      $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, [long]$Quality)
      $image.Save($tempPath, $jpegCodec, $encoderParams)
    }
    finally {
      $image.Dispose()
    }

    $optimizedFile = Get-Item $tempPath
    if ($optimizedFile.Length -lt $file.Length) {
      Remove-Item -LiteralPath $file.FullName -Force
      Move-Item -LiteralPath $tempPath -Destination $file.FullName -Force
      $afterBytes += (Get-Item $file.FullName).Length
      $optimized += 1
    }
    else {
      Remove-Item -LiteralPath $tempPath -Force
      $afterBytes += $file.Length
    }
  }
  catch {
    if (Test-Path -LiteralPath $tempPath) {
      Remove-Item -LiteralPath $tempPath -Force
    }
    $afterBytes += $file.Length
    Write-Warning "Skipped $($file.FullName): $($_.Exception.Message)"
  }
}

$savedBytes = $beforeBytes - $afterBytes

[pscustomobject]@{
  FilesScanned = $files.Count
  FilesOptimized = $optimized
  Quality = $Quality
  BeforeMB = [math]::Round($beforeBytes / 1MB, 2)
  AfterMB = [math]::Round($afterBytes / 1MB, 2)
  SavedMB = [math]::Round($savedBytes / 1MB, 2)
  SavedPercent = if ($beforeBytes -gt 0) { [math]::Round(($savedBytes / $beforeBytes) * 100, 1) } else { 0 }
} | Format-List
