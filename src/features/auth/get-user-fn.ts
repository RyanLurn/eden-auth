import {
  getRequestHeaders,
  setResponseStatus,
  getRequestUrl,
} from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

import type {
  SuccessResponse,
  ErrorResponse,
} from "@/types/serialized-responses";
import type { SerializedUser } from "@/features/auth/types";

import { getInferredSession } from "@/features/auth/get-inferred-session";
import { serializeUser } from "@/features/auth/utils/serialize-user";

const method = "GET";

export const getUserFn = createServerFn({ method }).handler(async () => {
  const headers = getRequestHeaders();
  const href = getRequestUrl().href;

  const getInferredSessionResult = await getInferredSession({
    headers,
    method,
    href,
  });

  if (!getInferredSessionResult.success) {
    const error = getInferredSessionResult.error;
    console.error(error.serializeForLog());

    setResponseStatus(error.statusCode);
    const errorInUI = error.serializeForUI();
    const errorResponse: ErrorResponse<typeof errorInUI> = {
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
