import type { ComponentProps } from "react";

import type { StrictOmit } from "@/types/utils";

import { FieldError, FieldLabel, Field } from "@/components/ui/field";
import { useFieldContext } from "@/components/form/contexts";
import { Input } from "@/components/ui/input";

export function TextField(
  textFieldProps: StrictOmit<
    ComponentProps<typeof Input>,
    "aria-invalid" | "onChange" | "onBlur" | "value" | "name" | "id"
  >
) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        name={field.name}
        id={field.name}
        {...textFieldProps}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
