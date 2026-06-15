import {
  getRequestHeaders,
  setResponseStatus,
  getRequestUrl,
} from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

import type {
  SerializedResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/types/serialized-responses";
import type { SerializedUser } from "@/features/auth/types";
import type { ErrorInUI } from "@/error/classes/base";

import { getAuthenticatedSession } from "@/features/auth/operations/server-only/get-authenticated-session";
import { serializeUser } from "@/features/auth/utils/serialize-user";

const method = "GET";

export const getAuthenticatedUser = createServerFn({ method }).handler(
  async (): Promise<
    SerializedResponse<
      SerializedUser,
      ErrorInUI<"UNAUTHENTICATED_ERROR"> | ErrorInUI<"INTERNAL_SERVER_ERROR">
    >
  > => {
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
      return {
        success: false,
        error: error.serializeForUI(),
      };
    }

    return {
      success: true,
      data: serializeUser(getAuthenticatedSessionResult.data.user),
    };
  }
);
