import { useQuery } from "react-query";
import { useTicketsClient } from "../../../useClient";

export function useTickets() {
  const { getTickets } = useTicketsClient();
  return useQuery("tickets", () => getTickets());
}
