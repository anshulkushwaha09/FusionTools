import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handler } from './netlify/functions/generate.js'

// Simple middleware to run Netlify Function locally using Vite
const netlifyFunctionProxy = () => {
  return {
    name: 'netlify-function-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/.netlify/functions/generate' && req.method === 'POST') {
          // 1. Buffer body
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const body = Buffer.concat(buffers).toString();

          // 2. Mock Netlify Event
          const event = {
            httpMethod: 'POST',
            body: body,
            headers: req.headers
          };

          try {
            // 3. Run Handler
            const response = await handler(event, {});
            
            // 4. Send Response
            res.statusCode = response.statusCode;
            Object.keys(response.headers || {}).forEach(key => {
              res.setHeader(key, response.headers[key]);
            });
            res.end(response.body);
          } catch (err) {
            console.error('Function Proxy Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }
        next();
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env } // Merge into process.env for the handler usage

  // Determine base path: Netlify uses root '/', GitHub Pages uses repo name '/FusionTools/'
  const isNetlify = process.env.NETLIFY === 'true';
  const base = isNetlify ? '/' : '/FusionTools/';

  return {
    base: base,
    plugins: [react(), netlifyFunctionProxy()],
  }
})
