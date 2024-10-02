import express from "express";
import { createServer as createViteServer } from "vite";
import { renderPage } from "vite-plugin-ssr/server";

async function createServer() {
  const app = express();

  // Create Vite Server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  app.get("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      const pageContext = await renderPage({ url });
      const { html } = pageContext;
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
}

createServer();
