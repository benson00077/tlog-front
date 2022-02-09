This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# env 
- DB_USER=<...>
- DB_PASS=<...>
- NEXT_PUBLIC_API_URL=<gql url>

# SSR w/ Apollo cache

## Refer:
  -  [here](https://medium.com/@zhamdi/server-side-rendering-ssr-using-apollo-and-next-js-ac0b2e3ea461) describe the problem and logic duplication between `getServerSideProps` and `useQuery`
  -  [here](https://github.com/vercel/next.js/discussions/15736) is the discusstions thread
  -  [here](https://github.com/shshaw/next-apollo-ssr) is the solution provided in that thread

## Problem
- What if I use `getServerSideProps` with `useQuery()` ? 
  - The client is a different instance because there are TWO clients - one one server, that get's reinstated on every request and one on client, that gets hydrated with the data you send yourself in getServerSideProps. If you did not do it, you would refetch all the data on the client again, as the client cache wouldn't be populated.
- P.S. What about the ssrMode option in apollo docs ? [Here](https://stackoverflow.com/a/60342279) referring a solution use next-with-apollo package.

## Solution
### SSR
    Has the flag method getServerSideProps that lets the lib know you want that specific page to be server-side rendered whilst providing the page component with the data (prefilled in its props argument)
### Apollo 
    Has that special method called getDataFromTree that finds in your page tree all components that use the hook useQuery. They then execute all queries at once to allow you to send your page prefilled with data to the browser.