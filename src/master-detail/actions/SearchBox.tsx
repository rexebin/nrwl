import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => {
    // @ts-ignore
    return searchParams.get("search") || "";
  });

  useEffect(() => {
    setSearchParams({ search });
  }, [search, setSearchParams]);

  return (
    <TextField
      value={search}
      id="search-box"
      onChange={(e) => setSearch(e.target.value)}
      label="Search"
      margin="normal"
      size={"small"}
    />
  );
}
