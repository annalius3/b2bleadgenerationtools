import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const TOKEN_PATH = resolve(process.cwd(), '.gsc-tokens.json');
const SITE_URL = 'sc-domain:b2bleadgenerationtools.com';

function getEnv(key) {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return undefined;
  const content = readFileSync(envPath, 'utf-8');
  const match = content.match(new RegExp('^' + key + '=(.+)$', 'm'));
  return match ? match[1].trim() : undefined;
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getAccessToken() {
  if (!existsSync(TOKEN_PATH)) {
    throw new Error('Token file not found. Run setup-gsc-auth.mjs first.');
  }

  const tokens = JSON.parse(readFileSync(TOKEN_PATH, 'utf-8'));

  if (Date.now() < tokens.expires_at - 60000) {
    return tokens.access_token;
  }

  console.log('Access token expired, refreshing...');

  const clientId = getEnv('GSC_CLIENT_ID');
  const clientSecret = getEnv('GSC_CLIENT_SECRET');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: tokens.refresh_token,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token. Re-run setup-gsc-auth.mjs');
  }

  const data = await response.json();

  tokens.access_token = data.access_token;
  tokens.expires_at = Date.now() + (data.expires_in * 1000);

  writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('Token refreshed successfully.');

  return tokens.access_token;
}

async function submitUrl(url, accessToken) {
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED'
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Indexing failed: ${response.status} - ${err}`);
  }

  return response.json();
}

async function main() {
  const urls = process.argv.slice(2);

  if (urls.length === 0) {
    console.log('Usage: node submit-indexing.mjs <url1> [url2] [url3] ...');
    console.log('Example: node submit-indexing.mjs https://www.b2bleadgenerationtools.com/guides/what-is-apollo-io');
    process.exit(1);
  }

  console.log('=== Google Indexing API Submission ===\n');
  console.log(`Site: ${SITE_URL}`);
  console.log(`URLs to submit: ${urls.length}\n`);

  const accessToken = await getAccessToken();

  let success = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      console.log(`Submitting: ${url}`);
      const result = await submitUrl(url, accessToken);
      console.log(`  ✅ Submitted successfully`);
      success++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failed++;
    }

    await delay(500);
  }

  console.log(`\n---`);
  console.log(`Done: ${success}/${urls.length} success, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
