import React from "react";

export function Page({ is404 }) {
  return (
    <div>
      <h1>{is404 ? "404: Page Not Found" : "500: Internal Server Error"}</h1>
      <p>
        {is404
          ? "The page you are looking for does not exist."
          : "An unexpected error occurred."}
      </p>
    </div>
  );
}
