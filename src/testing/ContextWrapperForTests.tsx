import { PropsWithChildren } from "react";
import { MessageProvider } from "../message";
import { BackendProvider } from "../contexts";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

export function ContextWrapperForTests({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <MessageProvider>
      <BackendProvider>
        <BrowserRouter>
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      </BackendProvider>
    </MessageProvider>
  );
}
