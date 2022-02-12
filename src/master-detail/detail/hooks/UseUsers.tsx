import { useBackend } from "../../../contexts";
import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";

export function useUsers() {
  const { backend } = useBackend();
  return useQuery("users", () => firstValueFrom(backend.users()));
}
