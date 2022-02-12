import React, { FC } from "react";
import { CircularProgress } from "@mui/material";
import { mainColor } from "../theme";
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress";

export interface LoadingSpinnerProps extends CircularProgressProps {
  isLoading: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  isLoading,
  size,
  ...props
}) => {
  return isLoading ? (
    <CircularProgress
      style={{ marginLeft: 5, color: mainColor }}
      size={size ?? "1em"}
      {...props}
    />
  ) : null;
};
