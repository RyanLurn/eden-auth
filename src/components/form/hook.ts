import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/components/form/contexts";
import { SubmitButton } from "@/components/form/submit-button";
import { CheckField } from "@/components/form/check-field";
import { TextField } from "@/components/form/text-field";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, CheckField },
  formComponents: { SubmitButton },
});
