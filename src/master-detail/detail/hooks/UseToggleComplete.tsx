import { useTicketsClient } from "../../../useClient";
import { useMutation, useQueryClient } from "react-query";
import { Ticket } from "../../../backend";

export function useToggleComplete() {
  const { toggleComplete } = useTicketsClient();
  const queryClient = useQueryClient();
  return useMutation((id: number) => toggleComplete(id), {
    onSuccess: async (data: Ticket) => {
      await queryClient.invalidateQueries(["ticket", data.id]);
    },
  });
}
