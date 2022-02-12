import { useUsers } from "./UseUsers";
import { useEffect, useState } from "react";

export function useUserIdNameDict() {
  const { data: users, isLoading } = useUsers();
  const [userLabels, setUserLabels] = useState<Record<string, string>>({});
  useEffect(() => {
    if (users) {
      setUserLabels(
        users.reduce((acc: Record<string, string>, user) => {
          acc[`${user.id}`] = user.name;
          return acc;
        }, {})
      );
    }
  }, [users]);
  return { userLabels, isLoading };
}
