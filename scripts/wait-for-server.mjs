import process from 'node:process';

const port = Number(process.env.PORT || 5000);
const host = process.env.API_HOST || '127.0.0.1';
const healthUrl = process.env.API_HEALTH_URL || `http://${host}:${port}/health`;
const timeoutMs = Number(process.env.WAIT_TIMEOUT_MS || 30000);
const intervalMs = Number(process.env.WAIT_POLL_MS || 1000);

async function waitForServer() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(healthUrl);
      if (response.ok) {
        console.log(`Backend ready at ${healthUrl}`);
        return;
      }
    } catch {
      // Keep polling until the backend is available.
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Timed out waiting for backend at ${healthUrl}`);
}

waitForServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
