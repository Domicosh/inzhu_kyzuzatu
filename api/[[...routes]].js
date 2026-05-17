export default async (req, res) => {
  try {
    // Load the built server module
    const module = await import('../dist/server/server.js');
    const serverHandler = module.default;

    // Build the full URL with protocol
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'] || 'localhost';
    const fullUrl = `${protocol}://${host}${req.url}`;
    
    // Create a Web Fetch API request
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (typeof value === 'string') {
        headers.set(key, value);
      }
    }

    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      }
    }

    const fetchReq = new Request(fullUrl, {
      method: req.method || 'GET',
      headers,
      body,
    });

    // Call the server handler
    const response = await serverHandler.fetch(fetchReq, {}, {});

    // Send response back
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Internal Server Error');
  }
};
