import { useTicketsClient } from "../../useClient";
import { useQuery } from "react-query";

export function useTicket(id?: string) {
  const { getTicket } = useTicketsClient();
  return useQuery(["ticket", id], () => {
    return id === undefined ? undefined : id === "new" ? {} : getTicket(+id);
  });
}
