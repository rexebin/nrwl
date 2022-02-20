import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { HfAutocompleteProps } from "./HfAutocompleteProps";

type RHFRenderProps = {
  field: ControllerRenderProps;
};

export function HfAutoComplete({
  formContext,
  name,
  label,
  defaultValue,
  textFieldProps,
  renderInput,
  error,
  helperText,
  rules,
  required,
  ...autoCompleteProps
}: HfAutocompleteProps) {
  const { control } = formContext;
  const renderAutocomplete = ({
    field: { onChange, value, ...controllerProps },
  }: RHFRenderProps) => (
    <Autocomplete
      value={value ?? null}
      disableClearable={required}
      onChange={(_, data) => {
        onChange(data);
      }}
      renderInput={
        renderInput ||
        ((params) => (
          <TextField
            autoComplete={"off"}
            variant={"outlined"}
            label={label}
            ref={params.InputProps.ref}
            error={error}
            helperText={helperText}
            {...textFieldProps}
            required={textFieldProps?.required ?? required}
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off",
              "data-testid": name,
            }}
          />
        ))
      }
      {...controllerProps}
      {...autoCompleteProps}
    />
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: (textFieldProps?.required || required) ?? false,
          message: `Required`,
        },
        ...rules,
      }}
      defaultValue={defaultValue}
      render={(renderPops) => renderAutocomplete(renderPops)}
    />
  );
}
