import { getRequestHeaders, getRequestUrl } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

import type {
  SuccessResponse,
  ErrorResponse,
} from "@/types/serialized-responses";
import type { SerializedUser } from "@/features/auth/types";

import { getInferredSession } from "@/features/auth/get-inferred-session";
import { serializeUser } from "@/features/auth/utils";

export const getUserFn = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const url = getRequestUrl();

  const getInferredSessionResult = await getInferredSession({
    headers,
    method: "GET",
    url: url.href,
  });

  if (!getInferredSessionResult.success) {
    const error = getInferredSessionResult.error;
    console.error(error.serializeForLog());

    const errorInUI = error.serializeForUI();
    const errorResponse: ErrorResponse<typeof errorInUI.code> = {
      success: false,
      error: errorInUI,
    };
    return errorResponse;
  }

  const serializedUser = serializeUser(getInferredSessionResult.data.user);
  const successResponse: SuccessResponse<SerializedUser> = {
    success: true,
    data: serializedUser,
  };
  return successResponse;
});
