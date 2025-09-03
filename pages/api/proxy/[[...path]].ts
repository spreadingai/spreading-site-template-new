import type { NextApiRequest, NextApiResponse } from "next";

// Simple fetch proxy to bypass browser CORS for OpenAPI request panel
// Usage: client will request /api/proxy/<FULL_TARGET_URL>
// Example: /api/proxy/https://rtc-api.zego.im/?Action=StartMix&...
// We forward method, headers (safe subset) and body, and return upstream status/body/headers.

export const config = {
  api: {
    bodyParser: true, // default JSON body parsing is fine for our use cases
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle preflight just in case
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.status(200).end();
      return;
    }

    const prefix = "/api/proxy/";
    const url = req.url || "";
    const idx = url.indexOf(prefix);
    const targetRaw = idx >= 0 ? url.substring(idx + prefix.length) : "";

    if (!targetRaw) {
      res.status(400).json({ error: "Missing target URL after /api/proxy/" });
      return;
    }

    // targetRaw is expected to be a full URL like https://domain/path?query
    const targetUrl = decodeURIComponent(targetRaw);

    // Build headers: forward a safe subset
    const headers = new Headers();
    const incoming = req.headers;
    // Preserve content-type and authorization if present
    if (incoming["content-type"]) headers.set("content-type", String(incoming["content-type"]));
    if (incoming["authorization"]) headers.set("authorization", String(incoming["authorization"]));
    if (incoming["accept"]) headers.set("accept", String(incoming["accept"]));

    // Determine body
    let body: BodyInit | undefined;
    if (req.method && ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      // If content-type is JSON and body is an object, re-stringify
      if (req.body && typeof req.body === "object" && headers.get("content-type")?.includes("application/json")) {
        body = JSON.stringify(req.body);
      } else if (typeof req.body === "string") {
        body = req.body;
      } else if (req.body instanceof Buffer) {
        body = req.body;
      } else {
        // No body or unknown type
        body = undefined;
      }
    }

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    // Forward status and content-type
    const contentType = upstream.headers.get("content-type") || "text/plain";
    res.status(upstream.status);
    res.setHeader("Content-Type", contentType);
    // Optionally forward other useful headers
    const passThroughHeaders = ["x-request-id", "x-trace-id", "content-disposition"];
    passThroughHeaders.forEach((h) => {
      const v = upstream.headers.get(h);
      if (v) res.setHeader(h, v);
    });

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.send(buffer);
  } catch (err: any) {
    console.error("[proxy] error:", err?.message || err);
    res.status(502).json({ error: "Proxy request failed", detail: String(err?.message || err) });
  }
}

