import type { AuthenticatedSession } from "@/features/auth/types";
import type { Result } from "@/types/result";

import { UnauthenticatedError } from "@/features/auth/error/classes/unauthenticated";
import { UnexpectedError } from "@/error/classes/unexpected";
import { auth } from "@/features/auth";

export async function getInferredSession({
  headers,
  method,
  href,
}: {
  headers: Headers;
  method: string;
  href: string;
}): Promise<
  Result<AuthenticatedSession, UnauthenticatedError | UnexpectedError>
> {
  try {
    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      return {
        success: false,
        error: new UnauthenticatedError({ method, href }),
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
        message: `An error occurred while trying to get session for a request to ${href}.`,
        cause: error,
      }),
    };
  }
}
