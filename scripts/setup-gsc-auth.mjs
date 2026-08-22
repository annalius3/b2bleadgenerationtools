import http from 'http';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const envLocalPath = resolve(process.cwd(), '.env.local');

let CLIENT_ID, CLIENT_SECRET, REDIRECT_URI;

if (existsSync(envLocalPath)) {
  const envContent = readFileSync(envLocalPath, 'utf-8');
  const getEnv = (key) => {
    const match = envContent.match(new RegExp(`^${key}=(.+)$`, 'm'));
    return match ? match[1].trim() : undefined;
  };
  CLIENT_ID = getEnv('GSC_CLIENT_ID');
  CLIENT_SECRET = getEnv('GSC_CLIENT_SECRET');
  REDIRECT_URI = getEnv('GSC_REDIRECT_URI') || 'http://localhost:3000/callback';
}

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Error: GSC_CLIENT_ID and GSC_CLIENT_SECRET must be set in .env.local');
  process.exit(1);
}

const CREDENTIALS = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI
};

const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const TOKEN_PATH = resolve(process.cwd(), '.gsc-tokens.json');

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getAuthorizationCode() {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
    `client_id=${CREDENTIALS.client_id}&` +
    `redirect_uri=${encodeURIComponent(CREDENTIALS.redirect_uri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(SCOPES.join(' '))}&` +
    `access_type=offline&` +
    `prompt=consent`;

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:3000`);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error: ${error}</h1><p>You can close this window.</p>`);
        server.close();
        reject(new Error(error));
        return;
      }

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Authorization successful!</h1><p>You can close this window.</p>');
        server.close();
        resolve(code);
        return;
      }

      res.writeHead(404);
      res.end('Not found');
    });

    server.listen(3000, () => {
      console.log('\n=== Google Search Console OAuth2 Setup ===\n');
      console.log('1. Open this URL in your browser:\n');
      console.log(authUrl);
      console.log('\n2. Grant access to your Google account');
      console.log('3. You will be redirected back here automatically\n');
    });
  });
}

async function exchangeCode(code) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CREDENTIALS.client_id,
      client_secret: CREDENTIALS.client_secret,
      redirect_uri: CREDENTIALS.redirect_uri,
      grant_type: 'authorization_code'
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  return response.json();
}

async function refreshAccessToken(refreshToken) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: CREDENTIALS.client_id,
      client_secret: CREDENTIALS.client_secret,
      grant_type: 'refresh_token'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return { ...data, refresh_token: refreshToken };
}

async function main() {
  try {
    const code = await getAuthorizationCode();
    console.log('Authorization code received!');

    const tokens = await exchangeCode(code);
    console.log('Tokens obtained successfully!');

    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };

    writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
    console.log(`\nTokens saved to: ${TOKEN_PATH}`);
    console.log('\nNow you can use the indexing script to submit URLs to Google.');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
