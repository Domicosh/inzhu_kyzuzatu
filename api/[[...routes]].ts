import type { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // Dynamic import of the server handler
    const { default: handler } = await import('../dist/server/assets/start.js');
    
    // Convert Node request to Web standard Request
    const protocol = (req.headers['x-forwarded-proto'] as string) || 'http';
    const host = (req.headers['host'] as string) || 'localhost';
    const url = new URL((req.url || '/'), `${protocol}://${host}`);
    
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value !== undefined) {
        headers.append(key, Array.isArray(value) ? value.join(', ') : String(value));
      }
    });
    
    let body: BodyInit | undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }
    
    const request = new Request(url, {
      method: req.method || 'GET',
      headers,
      body,
    });
    
    // Call the handler
    const response = await handler.fetch(request, {}, {});
    
    // Set status
    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    
    // Set headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send response
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
