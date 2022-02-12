import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from "@mui/material";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { ReactNode } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

export interface HfAutocompleteProps
  extends Omit<
    AutocompleteProps<string, boolean, boolean, boolean>,
    "renderInput"
  > {
  formContext: UseFormReturn<any>;
  name: string;
  label: string;
  defaultValue?: string;
  renderInput?: (
    props:
      | FilledTextFieldProps
      | OutlinedTextFieldProps
      | StandardTextFieldProps
  ) => ReactNode;
  textFieldProps?:
    | StandardTextFieldProps
    | OutlinedTextFieldProps
    | FilledTextFieldProps;
  error?: boolean;
  helperText?: string;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  required?: boolean;
}
