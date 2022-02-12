import { useCallback } from "react";
import { useBackend } from "./contexts";
import { Ticket } from "./backend";
import { firstValueFrom } from "rxjs";

/**
 * Adaptor to mocked backend. To be Replaced by real backend.
 */
export function useTicketsClient() {
  const { backend } = useBackend();
  const post = useCallback(
    async function post(data: Ticket): Promise<Ticket> {
      return await firstValueFrom(backend.newTicket(data));
    },
    [backend]
  );

  const getTicket = useCallback(
    async function get(id: number): Promise<Ticket> {
      return await firstValueFrom(backend.ticket(id));
    },
    [backend]
  );

  const getTickets = useCallback(
    async function get(): Promise<Ticket[]> {
      return await firstValueFrom(backend.tickets());
    },
    [backend]
  );

  const patch = useCallback(
    async function patch(data: Ticket): Promise<Ticket> {
      return await firstValueFrom(backend.newTicket(data));
    },
    [backend]
  );

  return { post, getTicket, getTickets, patch };
}
