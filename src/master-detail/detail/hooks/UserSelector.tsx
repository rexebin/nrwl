import { HfAutoComplete } from "../../../components/HfAutoComplete";
import { UseFormReturn } from "react-hook-form";
import { Ticket } from "../../../backend";
import { useEffect, useState } from "react";
import { useUsers } from "./UseUsers";
import { useUserIdNameDict } from "./UseUserIdNameDict";

interface UserSelectorProps {
  formContext: UseFormReturn<Ticket>;
  name: string;
  label: string;
}

export function UserSelector(props: UserSelectorProps) {
  const { data: users } = useUsers();
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const { userLabels } = useUserIdNameDict();
  useEffect(() => {
    if (users) {
      setUserOptions(users.map((user) => `${user.id}`));
    }
  }, [users]);
  return (
    <HfAutoComplete
      {...props}
      key={`${JSON.stringify(userLabels)}`}
      options={userOptions}
      getOptionLabel={(option) => userLabels[option] ?? ""}
      isOptionEqualToValue={(option, value) => +option === +value}
    />
  );
}
