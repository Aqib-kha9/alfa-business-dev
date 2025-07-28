// lib/parseForm.ts

import formidable from 'formidable';
import { Readable } from 'stream';
import { NextRequest } from 'next/server';
import type { IncomingMessage } from 'http';

// convert NextRequest to Node.js IncomingMessage
function toNodeRequest(req: NextRequest): IncomingMessage {
  const body = req.body as Readable;
  const headers = Object.fromEntries(req.headers.entries());

  const nodeReq = Object.assign(Readable.from(body), {
    headers,
    method: req.method,
    url: req.url,
  });

  return nodeReq as unknown as IncomingMessage;
}

export async function parseFormData(req: NextRequest): Promise<{ fields: any; files: any }> {
  const nodeReq = toNodeRequest(req);

  const form = formidable({
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
