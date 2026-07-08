import handler from "@astrojs/cloudflare/entrypoints/server";

export { PluginBridge } from "@emdash-cms/cloudflare/sandbox";

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    
    // Token login page
    if (url.pathname === "/token-login" || url.pathname === "/token-login/") {
      return new Response(`<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Token Login</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh}
.c{background:#1e293b;border-radius:12px;padding:2rem;width:100%;max-width:420px}
h1{font-size:1.2rem;margin-bottom:1.5rem;text-align:center}
input{width:100%;padding:.75rem;border:1px solid #334155;border-radius:8px;background:#0f172a;color:#f8fafc;font-size:.85rem;font-family:monospace;margin-bottom:.75rem}
input:focus{outline:none;border-color:#3b82f6}
button{width:100%;padding:.75rem;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-size:.9rem;cursor:pointer;font-weight:600}
button:hover{background:#2563eb}
.h{font-size:.7rem;color:#64748b;text-align:center;margin-top:1rem;word-break:break-all}
</style>
</head>
<body>
<div class="c">
<h1>Token Login</h1>
<input type="password" id="t" placeholder="ec_pat_..." autofocus>
<button onclick="login()">Login</button>
<p class="h">Token: ec_pat_Ai7RlgLh1jmFKn4oBSLmsTroIY6mhHQSx3Xy-MZJbaQ</p>
</div>
<script>
function login(){
  document.cookie="emdash_token="+encodeURIComponent(document.getElementById("t").value)+";path=/;max-age=86400;SameSite=Lax";
  location.href="/_emdash/admin"
}
</script>
</body>
</html>`, { headers: { "Content-Type": "text/html" } });
    }
    
    // Convert emdash_token cookie to Authorization header
    if (url.pathname.startsWith("/_emdash") && !request.headers.has("Authorization")) {
      const cookie = request.headers.get("Cookie") || "";
      const match = cookie.match(/emdash_token=([^;]+)/);
      if (match) {
        const headers = new Headers(request.headers);
        headers.set("Authorization", "Bearer " + decodeURIComponent(match[1]));
        request = new Request(request, { headers });
      }
    }
    
    return handler.fetch(request, env, ctx);
  },
};
