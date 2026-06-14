import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/components/form/contexts";
import { TextField } from "@/components/form/text-field";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: {},
});
