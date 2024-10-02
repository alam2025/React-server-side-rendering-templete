import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";

export const clientRouting = true;

export function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const root = document.getElementById("root");
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<App pageProps={pageProps} />);
}
