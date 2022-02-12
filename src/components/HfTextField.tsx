import React, {FC} from 'react';
import {Controller, RegisterOptions, UseFormReturn} from 'react-hook-form';
import {StandardTextFieldProps, TextField} from "@mui/material";

export interface HfTextFieldProps extends StandardTextFieldProps {
    formContext: UseFormReturn<any>;
    name: string;
    defaultValue?: string | number | Date | null;
    rules?: RegisterOptions;
}

export const HfTextField: FC<HfTextFieldProps> = ({
    defaultValue,
    formContext,
    name,
    required,
    rules,
    ...props
}) => {
    const {control} = formContext;
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: {value: required ?? false, message: 'Required'},
                ...rules,
            }}
            defaultValue={defaultValue}
            render={({field: {ref, value, onChange, ...renderProps}}) => (
                <TextField
                    inputRef={ref}
                    inputProps={{
                        'data-testid': name,
                    }}
                    required={required}
                    onChange={(e) => onChange(e.target.value)}
                    value={value ?? ''}
                    {...props}
                    {...renderProps}
                />
            )}
        />
    );
};
