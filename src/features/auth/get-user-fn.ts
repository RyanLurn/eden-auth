import { getRequestHeaders, getRequestUrl } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

import type {
  SuccessResponse,
  ErrorResponse,
} from "@/types/serialized-responses";
import type { SerializedUser } from "@/features/auth/types";

import { getSession } from "@/features/auth/get-session";
import { serializeUser } from "@/features/auth/utils";

export const getUserFn = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const url = getRequestUrl();

  const getSessionResult = await getSession({
    headers,
    method: "GET",
    url: url.href,
  });

  if (!getSessionResult.success) {
    const error = getSessionResult.error;
    console.error(error.serializeForLog());

    const errorInUI = error.serializeForUI();
    const errorResponse: ErrorResponse<typeof errorInUI.code> = {
      success: false,
      error: errorInUI,
    };
    return errorResponse;
  }

  const serializedUser = serializeUser(getSessionResult.data.user);
  const successResponse: SuccessResponse<SerializedUser> = {
    success: true,
    data: serializedUser,
  };
  return successResponse;
});
