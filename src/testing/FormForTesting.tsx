import { PropsWithChildren } from 'react';
import { UnpackNestedValue, UseFormReturn } from 'react-hook-form';

export function FormForTesting<T>(
  {
    children,
    submit,
    formContext
  }: PropsWithChildren<{
    submit: (e: UnpackNestedValue<T>) => void,
    formContext: UseFormReturn<T>
  }>) {
  const { handleSubmit } = formContext;
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(submit)(e);
    }
    }>{children}</form>
  );
}
