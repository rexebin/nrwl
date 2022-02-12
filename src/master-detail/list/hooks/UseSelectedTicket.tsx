import { useParams } from "react-router";
import { useEffect, useState } from "react";

export function useSelectedTicket() {
  const params = useParams();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  useEffect(() => {
    if (params?.id !== undefined && params?.id !== "new") {
      setSelectedTicket(+params?.id);
      return;
    }
    setSelectedTicket(null);
  }, [params]);
  return {
    selectedTicket,
  };
}
