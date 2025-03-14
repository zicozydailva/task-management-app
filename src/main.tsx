import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Auth0ProviderOptions } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const setProviderConfig = (): Auth0ProviderOptions => ({
  domain,
  clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience,
    scope: "openid email profile cms:super-admin",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider {...setProviderConfig()}>
        <App />
        <ToastContainer theme="colored" />
      </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>
);
