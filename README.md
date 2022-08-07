- [1. 👉 Description](#1--description)
- [2. 👉 Feature](#2--feature)
  - [2.1. Parallel struture on paragraph (when viewpoint with > 1440px)](#21-parallel-struture-on-paragraph-when-viewpoint-with--1440px)
  - [2.2. Parallel struture suport in this pattern](#22-parallel-struture-suport-in-this-pattern)
  - [2.3. About Heading in Post Degailt pages](#23-about-heading-in-post-degailt-pages)
    - [2.3.1. Rules](#231-rules)
    - [2.3.2. Heading 1 be converted to 2 automatically in front-end](#232-heading-1-be-converted-to-2-automatically-in-front-end)
    - [3.1.2. Heading thread line](#312-heading-thread-line)
- [4. 👉 Usage](#4--usage)
  - [4.1. env](#41-env)
  - [4.2. Deployment](#42-deployment)
  - [4.3. lint](#43-lint)
- [5. 👉 Dev logs](#5--dev-logs)
  - [5.1. TODO](#51-todo)
  - [5.2. Note](#52-note)
  - [5.3. Issue](#53-issue)
- [6. 👉 SSR w/ Apollo cache](#6--ssr-w-apollo-cache)
  - [6.1. Refer:](#61-refer)
  - [6.2. Problem](#62-problem)
  - [6.3. Solution](#63-solution)
    - [6.3.1. SSR](#631-ssr)
    - [6.3.2. Apollo](#632-apollo)
> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 1. 👉 Description
This is my TypeScript front-end SPA hosting my blog posts. 

This project is bootstraped w/ `creat-next-app` and laverage SSG feature from Next.js for better SEO. 

This project use `styled-component` for css styling. 

This project use `react-markdown` as dependency for parsing my blog posts content in markdown format, and use those surrounding dependencies like rehype-raw, remark-gfm and react-syntax-highlighter.

This project use `tocbot` for generating a table of contents from each blog posts.

This project use `apollo-client` to communicate w/ back-end.

The challenages I faceed is included in the [last part](#note) of this README.md file.

# 2. 👉 Feature
## 2.1. Parallel struture on paragraph (when viewpoint with > 1440px)
- Plain text v.s. code syntax block (#codeBlock or .columnRight)
- Native Language v.s. Foreign Language (#foreignLanguageBlock or .languageRight)

## 2.2. Parallel struture suport in this pattern
Foreign language in db is stored like what you do in makrdown codeblock but adding a hint text `language-foreign`, like bellow:
~~~html
Hello, this paragraph is parallel w/ the below text

```language-foreign
你好，這段文字希望可以跟上面的文字並列(viewpiont width > 1440px)。這在前端渲染時 html 最終會變成 <p> 而不是 <pre> 內的 <code>
```
~~~

`</br>` is what you want if you want to break row in a same paragraph in db. In other words, break rows by 'enter' would create a new paragraph in final html. `</br>` is what you want to keep parallel feature in same paragraph. Example as below only paragaprh <2> and <4> would be parallel w/ each other :
~~~html
<1> This paragraph would NOT parallel
<2> This paragraph would parallel w/ below block</br> <3> And this snippet as well !

```language-foreign
<4> 這段存在 DB 的文字，希望最終呈現在 UI 上可以跟上面的文字並列。
```
~~~

## 2.3. About Heading in Post Degailt pages 
### 2.3.1. Rules
  - Start your markdown files from heading 1. Don't use heading 6.
  - Do NOT skip heading number. Make sure keep heading tags in ascending order, esspecially h1 , h2 in markdown file / db.
### 2.3.2. Heading 1 be converted to 2 automatically in front-end
- Only the title of blog post would be rendered as heading 1 in front-end, regarding that multiple HTML h1 tag is bad for SEO. 
    ~~~
    # 3. 😢 Heading 1 in db

    ## 3.1. 😊 be converted to Heading 2 in front-end
    ### 3.1.1. 😊 Heading 2 > Heading 3, and so on
    ~~~
### 3.1.2. Heading thread line
- Support browser: Notice that the css for Subtitle theard line only works for browsers supporting `:has()` selector(Only Chrome^105 and Safari support)
- Support heading: Only work for heading 2 and heading 3 in fron-end intendedly. Any heading 1 in blog post content could slightly break UI, which is why we convert heading 1 in markdown db into heading 2 as per previos chapter explains.


# 4. 👉 Usage
## 4.1. env
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

## 4.2. Deployment
- Using pm2 to manamge muiltiple node apps.
  ```
  $ npm run build # as docs suggested
  $ pm2 start npm --name <myAppServerName> -- start
  ```
- Build as docs' suggest is a bit tricky though. See this [Q&A](https://stackoverflow.com/questions/59782255/how-can-i-make-a-minimal-deployment-of-a-next-js-non-static-app/71839401#71839401). Still I filed to use Output File Tracing feature in Next.js. 

## 4.3. lint
- Using Conventional Commits. 
  - Set up following [conventional-changelog](https://github.com/conventional-changelog/commitlint#what-is-commitlint). Include .husky/commit-msg.
  - See convention [here](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)
  - try locally `echo "foo: dummy commit msg" | ./node_modules/.bin/commitlint`

# 5. 👉 Dev logs
## 5.1. TODO
- [ ] Optimize loading animation. Consider using React Spring with next router obj [see me](https://stackoverflow.com/a/59117532/16124226). Or Framer Motion.
- [ ] Input rehypeRaw as hype rehypePlugins to insert iframe into blog post
- [ ] Set mermaid diagrams as remarkPlugins. [see me](https://github.com/remarkjs/react-markdown/issues/394)
- [ ] Collect the TODOs scatterd around this project
- [ ] Consider code block 排版問題: 設定四行內不 float。設定非 js, javascript, ts, typescript 語法自動換行(其他語言註解容易爆行)且左右比例可以5:5。設定不展開，而是點選浮動全螢幕檢視。
- [ ] Highlight line in code block

## 5.2. Note
- Debounce and Throttle. see [BackToTopBtn.tsx](/components//BackToTopBtn/BackToTopBtn.tsx)
- SSR styled components - w/ `babel-plugin-styled-components` [stackoverflow](https://stackoverflow.com/questions/51791163/warning-prop-classname-did-not-match-when-using-styled-components-with-seman)
- scrollTop w/ requestAnimationFrame

## 5.3. Issue
- [getStaticProps with { fallback: true } is very slow when spa routing.](https://github.com/vercel/next.js/issues/13751)

# 6. 👉 SSR w/ Apollo cache

## 6.1. Refer:
  -  [here](https://medium.com/@zhamdi/server-side-rendering-ssr-using-apollo-and-next-js-ac0b2e3ea461) describe the problem and logic duplication between `getServerSideProps` and `useQuery`
  -  [here](https://github.com/vercel/next.js/discussions/15736) is the discusstions thread
  -  [here](https://github.com/shshaw/next-apollo-ssr) is the solution provided in that thread

## 6.2. Problem
- What if I use `getServerSideProps` with `useQuery()` ? 
  - The client is a different instance because there are TWO clients - one one server, that get's reinstated on every request and one on client, that gets hydrated with the data you send yourself in getServerSideProps. If you did not do it, you would refetch all the data on the client again, as the client cache wouldn't be populated.
- P.S. What about the ssrMode option in apollo docs ? [Here](https://stackoverflow.com/a/60342279) referring a solution use next-with-apollo package.

## 6.3. Solution
### 6.3.1. SSR
    Has the flag method getServerSideProps that lets the lib know you want that specific page to be server-side rendered whilst providing the page component with the data (prefilled in its props argument)
### 6.3.2. Apollo 
    Has that special method called getDataFromTree that finds in your page tree all components that use the hook useQuery. They then execute all queries at once to allow you to send your page prefilled with data to the browser.