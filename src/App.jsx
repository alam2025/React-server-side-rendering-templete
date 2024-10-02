import React from "react";
import pkg from "react-helmet-async";
const { HelmetProvider } = pkg;
import { Page } from "./pages/home.page.jsx";

function App() {
  return (
    <HelmetProvider>
      <Page />
    </HelmetProvider>
  );
}

export default App;
