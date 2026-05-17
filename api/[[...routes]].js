/**
 * Vercel API handler for TanStack Start
 * Converts Node.js req/res to Fetch API and vice versa
 */
export default async (req, res) => {
  try {
    // Import the prebuilt TanStack Start server handler
    // Note: Using dynamic import to ensure ES modules work correctly
    const serverModule = await import('../dist/server/server.js');
    const server = serverModule.default;

    if (!server || !server.fetch) {
      throw new Error(
        `Invalid server handler. Expected fetch method, got: ${Object.keys(serverModule).join(', ')}`
      );
    }

    // Build request URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);

    // Prepare headers for Fetch API
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      }
    });

    // Prepare body if present
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      } else if (req.rawBody) {
        body = req.rawBody;
      }
    }

    // Create Fetch API Request
    const fetchRequest = new Request(url.toString(), {
      method: req.method || 'GET',
      headers,
      body,
    });

    // Call TanStack Start handler with Fetch API
    const fetchResponse = await server.fetch(fetchRequest, {}, {});

    // Set response status
    res.statusCode = fetchResponse.status;
    res.statusMessage = fetchResponse.statusText;

    // Copy response headers
    fetchResponse.headers.forEach((value, key) => {
      // Avoid setting content-encoding multiple times
      if (key !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    // Stream response body
    const buffer = await fetchResponse.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('[[[...routes]]] Error:', error);
    
    // Only respond if headers haven't been sent
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(
        JSON.stringify({
          error: 'Internal Server Error',
          ...(process.env.NODE_ENV === 'development' && {
            details: error.message,
            stack: error.stack,
          }),
        })
      );
    }
  }
};
