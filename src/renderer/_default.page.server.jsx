import React from "react";
import { renderToString } from "react-dom/server";

import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import App from "../App";
import pkg from "react-helmet-async";
const { HelmetProvider } = pkg;

export { render };
export { passToClient };

const passToClient = ["pageProps"];

async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <App pageProps={pageProps} />
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${dangerouslySkipEscape(helmet.title.toString())}
        ${dangerouslySkipEscape(helmet.meta.toString())}
        ${dangerouslySkipEscape(helmet.link.toString())}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;
}
