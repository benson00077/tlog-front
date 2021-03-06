- [๐ Description](#-description)
- [๐ Feature](#-feature)
  - [Some patterns to follow in db markdown](#some-patterns-to-follow-in-db-markdown)
- [๐ Usage](#-usage)
  - [env](#env)
  - [lint](#lint)
- [๐ Dev logs](#-dev-logs)
  - [TODO](#todo)
  - [Note](#note)
  - [Issue](#issue)
- [๐ SSR w/ Apollo cache](#-ssr-w-apollo-cache)
  - [Refer:](#refer)
  - [Problem](#problem)
  - [Solution](#solution)
    - [SSR](#ssr)
    - [Apollo](#apollo)
> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# ๐ Description
This is my TypeScript front-end SPA hosting my blog posts. 

This project is bootstraped w/ `creat-next-app` and laverage SSG feature from Next.js for better SEO. 

This project use `styled-component` for css styling. 

This project use `react-markdown` as dependency for parsing my blog posts content in markdown format, and use those surrounding dependencies like rehype-raw, remark-gfm and react-syntax-highlighter.

This project use `tocbot` for generating a table of contents from each blog posts.

This project use `apollo-client` to communicate w/ back-end.

The challenages I faceed is included in the [last part](#note) of this README.md file.

# ๐ Feature
Have a parallel struture on paragraph: 
- Plain text v.s. code syntax block (#codeBlock or .columnRight)
- Native Language v.s. Foreign Language (#foreignLanguageBlock or .languageRight)

## Some patterns to follow in db markdown
Foreign language in db is stored like what you do in makrdown codeblock but adding a hint text `language-foreign`, like bellow:
~~~html
Hello, this paragraph is parallel w/ the below text

```language-foreign
ไฝ ๅฅฝ๏ผ้ๆฎตๆๅญๅธๆๅฏไปฅ่ทไธ้ข็ๆๅญไธฆๅใ้ๅจๅ็ซฏๆธฒๆๆ html ๆ็ตๆ่ฎๆ <p> ่ไธๆฏ <pre> ๅง็ <code>
```
~~~

`</br>` is what you want if you want to break row in a same paragraph in db. In other words, break rows by 'enter' would create a new paragraph in final html. `</br>` is what you want to keep parallel feature in same paragraph. Example as below only paragaprh <2> and <4> would be parallel w/ each other :
~~~html
<1> This paragraph would NOT parallel
<2> This paragraph would parallel w/ below block</br> <3> And this snippet as well !

```language-foreign
<4> ้ๆฎตๅญๅจ DB ็ๆๅญ๏ผๅธๆๆ็ตๅ็พๅจ UI ไธๅฏไปฅ่ทไธ้ข็ๆๅญไธฆๅใ
```
~~~

Prevnet to use heading 1 in markdown content since the title of blog post would be rendered as heading 1 in front-end.
~~~md
#๐ข Dont use heading 1. 
This would cause multiple HTML <h1> tag and bad for SEO. 

##๐ Starting w/ heading 2 is suggested 
###Subtitle 1
###Subtitle 2
~~~


# ๐ Usage
## env
Set enviorment variables as below. 
```bash
  # /.env.local
  #   connect to backend api listening on port 3001
  NEXT_PUBLIC_API_URL_DEV=http://localhost:3001/graphql
  NEXT_PUBLIC_API_URL_PRO=https://<myDomain>/graphql
```

Be aware of that mongo db have different URI format by version. The backend logic this porject connect to uses the second one.
```bash
# 1. mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
# 2. mongodb+srv://[username:password@]host[/[database][?options]]
```

## lint
- Using Conventional Commits. 
  - Set up following [conventional-changelog](https://github.com/conventional-changelog/commitlint#what-is-commitlint). Include .husky/commit-msg.
  - See convention [here](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)
  - try locally `echo "foo: dummy commit msg" | ./node_modules/.bin/commitlint`

# ๐ Dev logs
## TODO
- [ ] Optimize loading animation. Consider using React Spring with next router obj [see me](https://stackoverflow.com/a/59117532/16124226). Or Framer Motion.
- [ ] Input rehypeRaw as hype rehypePlugins to insert iframe into blog post
- [ ] Set mermaid diagrams as remarkPlugins. [see me](https://github.com/remarkjs/react-markdown/issues/394)
- [ ] Collect the TODOs scatterd around this project
- [ ] Consider code block ๆ็ๅ้ก: ่จญๅฎๅ่กๅงไธ floatใ่จญๅฎ้ js, javascript, ts, typescript ่ชๆณ่ชๅๆ่ก(ๅถไป่ช่จ่จป่งฃๅฎนๆ็่ก)ไธๅทฆๅณๆฏไพๅฏไปฅ5:5ใ่จญๅฎไธๅฑ้๏ผ่ๆฏ้ป้ธๆตฎๅๅจ่ขๅนๆชข่ฆใ
- [ ] Highlight line in code block

## Note
- Debounce and Throttle. see [BackToTopBtn.tsx](/components//BackToTopBtn/BackToTopBtn.tsx)
- SSR styled components - w/ `babel-plugin-styled-components` [stackoverflow](https://stackoverflow.com/questions/51791163/warning-prop-classname-did-not-match-when-using-styled-components-with-seman)
- scrollTop w/ requestAnimationFrame

## Issue
- [getStaticProps with { fallback: true } is very slow when spa routing.](https://github.com/vercel/next.js/issues/13751)

# ๐ SSR w/ Apollo cache

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