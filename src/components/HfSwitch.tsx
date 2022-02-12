import styled from "@emotion/styled";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  SwitchProps,
} from "@mui/material";
import React, { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const NfFormControlLabel = styled(FormControlLabel)`
  padding-bottom: 15px;

  & .MuiTypography-root.Mui-disabled {
    color: rgba(0, 0, 0, 0.7);
  }
`;

interface HfSwitchProps extends SwitchProps {
  formContext: UseFormReturn<any>;
  name: string;
  label: string;
  labelPlacement?: "bottom" | "top" | "start" | "end";
}

export const HfSwitch: FC<HfSwitchProps> = ({
  name,
  formContext,
  label,
  required,
  defaultValue,
  labelPlacement = "end",
  ...props
}) => {
  const { control } = formContext;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, value, onChange: _onChange, ...rest } }) => (
        <FormGroup>
          <NfFormControlLabel
            style={{
              paddingTop: "20px",
            }}
            control={
              <Switch
                checked={value ?? false}
                inputRef={ref}
                required={required}
                {...rest}
                {...props}
                onChange={(e, checked) => {
                  _onChange(e, checked);
                }}
                data-testid={name}
                {...props}
                color="primary"
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
};
