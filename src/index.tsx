import React from "react";
import ReactDOM from "react-dom/client"; 
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);