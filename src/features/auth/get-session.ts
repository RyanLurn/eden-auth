import type { Session } from "@/features/auth/types";
import type { Result } from "@/types/result";

import { UnauthenticatedError } from "@/features/auth/error/classes/unauthenticated";
import { UnexpectedError } from "@/error/classes/unexpected";
import { auth } from "@/features/auth";

export async function getSession({
  headers,
  method,
  url,
}: {
  headers: Headers;
  method: string;
  url: string;
}): Promise<Result<Session, UnauthenticatedError | UnexpectedError>> {
  try {
    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      return {
        success: false,
        error: new UnauthenticatedError({ method, url }),
      };
    }

    return {
      success: true,
      data: session,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `An error occurred while trying to get session for a request to "[${method}] ${url}".`,
        cause: error,
      }),
    };
  }
}
