import type { ComponentProps } from "react";

import type { StrictOmit } from "@/types/utils";

import { useFieldContext } from "@/components/form/contexts";
import { FieldLabel, Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckFieldProps extends StrictOmit<
  ComponentProps<typeof Checkbox>,
  "onCheckedChange" | "aria-invalid" | "checked" | "onBlur" | "name" | "id"
> {
  label: string;
}

export function CheckField({ label, ...props }: CheckFieldProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        onCheckedChange={(checked) => field.handleChange(checked)}
        checked={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        name={field.name}
        id={field.name}
        {...props}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
}
