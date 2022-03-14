This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# 👉 Usage
## env
```bash
  ## /.env.local
  DB_USER=<...>
  DB_PASS=<...>
  NEXT_PUBLIC_API_URL=<your gql url, like http://localhost:3001/graphql> 
```

# 👉 Dev logs
## TODO
- [ ] Optimize loading animation. Consider using React Spring with next router obj [see me](https://stackoverflow.com/a/59117532/16124226). Or Framer Motion.
- [ ] Input rehypeRaw as hype rehypePlugins to insert ifram into blog post
- [ ] Set mermaid diagrams as remarkPlugins. [see me](https://github.com/remarkjs/react-markdown/issues/394)
- [ ] Collect the TODOs scatterd around this project

## Note
- SSR styled components - w/ `babel-plugin-styled-components` [stackoverflow](https://stackoverflow.com/questions/51791163/warning-prop-classname-did-not-match-when-using-styled-components-with-seman)
- scrollTop w/ requestAnimationFrame

## Issue
- [getStaticProps with { fallback: true } is very slow when spa routing.](https://github.com/vercel/next.js/issues/13751)

# 👉 SSR w/ Apollo cache

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