import handler from "@astrojs/cloudflare/entrypoints/server";

export { PluginBridge } from "@emdash-cms/cloudflare/sandbox";

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Convert emdash_token cookie to Authorization header for admin access
    const url = new URL(request.url);
    if (url.pathname.startsWith("/_emdash") && !request.headers.has("Authorization")) {
      const cookieHeader = request.headers.get("Cookie") || "";
      const match = cookieHeader.match(/emdash_token=([^;]+)/);
      if (match) {
        const token = decodeURIComponent(match[1]);
        const headers = new Headers(request.headers);
        headers.set("Authorization", `Bearer ${token}`);
        request = new Request(request, { headers });
      }
    }
    return handler.fetch(request, env, ctx);
  },
};
