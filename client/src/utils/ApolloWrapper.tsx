"use client";

import { ApolloLink, HttpLink, gql, useQuery } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}
const MY_QUERY = gql`
  query WillFail {
    badField # This field's resolver produces an error
    goodField # This field is populated successfully
  }
`;

// function ShowingSomeErrors() {
//   const { loading, error, data } = useQuery(MY_QUERY, { errorPolicy: "all" });

//   if (loading) return <span>loading...</span>;

//   return (
//     <div>
//       <h2>Good: {data.goodField}</h2>

//       <pre>Bad: {error?.message}</pre>
//     </div>
//   );
// }

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
