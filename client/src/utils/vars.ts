import { makeVar } from "@apollo/client";
import { AuthenticatedUser } from "@gql";

export const authVar = makeVar<AuthenticatedUser|null>(null)