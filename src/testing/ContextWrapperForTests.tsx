import { PropsWithChildren } from "react";
import { MessageProvider } from "../message";
import { BackendProvider } from "../contexts";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

export function ContextWrapperForTests({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <MessageProvider>
      <BackendProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      </BackendProvider>
    </MessageProvider>
  );
}
