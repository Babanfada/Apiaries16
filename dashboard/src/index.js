/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("app");
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // onError: queryErrorHandler,
      staleTime: 600000,
      // staleTime: 6000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
