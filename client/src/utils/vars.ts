import { makeVar } from "@apollo/client";
import { AuthenticatedUser } from "@gql";

export const authVar = makeVar<AuthenticatedUser | null>(null);
export const isLoggedIn = makeVar<boolean>(
  typeof window !== "undefined" && !!localStorage.getItem("authToken")
);
declare const __DEV__: boolean;
