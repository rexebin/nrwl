import React from "react";
import { render } from "react-dom";
import "./index.css";
import { App } from "./app/app";
import { BackendProvider } from "./contexts/BackendContext";
import { MessageProvider, MessageSnackBar } from "./message";
import { BrowserRouter } from "react-router-dom";
import { FullPageSpinner } from "./components/FullPageSpinner";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <MessageProvider>
        <BackendProvider>
          <MessageSnackBar />
          <BrowserRouter>
            <QueryClientProvider client={new QueryClient()}>
              <React.Suspense fallback={<FullPageSpinner />}>
                <App />
              </React.Suspense>
            </QueryClientProvider>
          </BrowserRouter>
        </BackendProvider>
      </MessageProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
