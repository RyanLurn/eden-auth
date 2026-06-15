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

import { getAuthenticatedSession } from "@/features/auth/operations/server-only/get-authenticated-session";
import { serializeUser } from "@/features/auth/utils/serialize-user";

const method = "GET";

export const getAuthenticatedUser = createServerFn({ method }).handler(
  async () => {
    const headers = getRequestHeaders();
    const href = getRequestUrl().href;

    const getAuthenticatedSessionResult = await getAuthenticatedSession({
      headers,
      method,
      href,
    });

    if (!getAuthenticatedSessionResult.success) {
      const error = getAuthenticatedSessionResult.error;
      console.error(error.serializeForLog());

      setResponseStatus(error.statusCode);
      const errorInUI = error.serializeForUI();
      const errorResponse: ErrorResponse<typeof errorInUI> = {
        success: false,
        error: errorInUI,
      };
      return errorResponse;
    }

    const serializedUser = serializeUser(
      getAuthenticatedSessionResult.data.user
    );
    const successResponse: SuccessResponse<SerializedUser> = {
      success: true,
      data: serializedUser,
    };
    return successResponse;
  }
);
