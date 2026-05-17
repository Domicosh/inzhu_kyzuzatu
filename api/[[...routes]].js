export default async (req, res) => {
  try {
    // Import the server handler built by TanStack Start
    const { default: server } = await import('../dist/server/server.js');

    // Convert incoming request to Web Fetch API format
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const url = new URL(req.url || '/', `${protocol}://${host}`);

    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers.set(key, value);
      }
    });

    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      if (typeof req.body === 'string') {
        body = req.body;
      } else {
        body = JSON.stringify(req.body);
      }
    }

    // Create Fetch API request
    const request = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    // Call the TanStack Start server handler
    const response = await server.fetch(request, {}, {});

    // Convert response back to Vercel format
    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
