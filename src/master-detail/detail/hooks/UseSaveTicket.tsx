import { useTicketsClient } from "../../../useClient";
import { useMutation, useQueryClient } from "react-query";
import { Ticket } from "../../../backend";

export function useSaveTicket() {
  const { post, patch } = useTicketsClient();
  const queryClient = useQueryClient();
  return useMutation(
    ({ ticket, id }: { ticket: Ticket; id?: string }) => {
      if (id === "new" || id === undefined) {
        return post({ ...ticket });
      }
      if (+id !== +ticket.id) {
        throw new Error("Id mismatch");
      }
      return patch(ticket);
    },
    {
      onSuccess: async (_) => {
        await queryClient.invalidateQueries({
          predicate: (query) =>
            JSON.stringify(query.queryKey).indexOf("ticket") !== -1,
        });
      },
    }
  );
}
