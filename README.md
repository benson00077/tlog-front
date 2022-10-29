<a name="readme-top"></a>

<details>
  <summary>📔 Table of Contents</summary>

- [1. 👉 About the porject](#1--about-the-porject)
  - [1.1. Build with](#11-build-with)
    - [1.1.1. Tech Stack](#111-tech-stack)
    - [1.1.2. Features](#112-features)
      - [1.1.2.1. Parallel struture on paragraph (when viewpoint with > 1440px)](#1121-parallel-struture-on-paragraph-when-viewpoint-with--1440px)
      - [1.1.2.2. Heading thread line style](#1122-heading-thread-line-style)
- [2. 👉 Getting Started](#2--getting-started)
  - [2.1. Prerequisites](#21-prerequisites)
  - [2.2. Installation](#22-installation)
  - [2.3. Deployment / Hosting](#23-deployment--hosting)
  - [2.4. Lint](#24-lint)
- [3. 👉 Usage](#3--usage)
  - [3.1. Patterns to follow for parallel struture in Blog post data](#31-patterns-to-follow-for-parallel-struture-in-blog-post-data)
  - [3.2. Patterns to follor for better heading in blog post detail pages](#32-patterns-to-follor-for-better-heading-in-blog-post-detail-pages)
  - [3.3. Heading 1 be converted to 2 automatically in front-end](#33-heading-1-be-converted-to-2-automatically-in-front-end)
  - [3.4 About blckquote / quote](#34-about-blckquote--quote)
- [4. 👉 Roadmap](#4--roadmap)
- [5. 👉 Acknowledgments](#5--acknowledgments)
  - [5.1. Dev Note](#51-dev-note)
  - [5.2. Problem (Pending): slow dev exp using getStaticProps with `{ fallback: true }`](#52-problem-pending-slow-dev-exp-using-getstaticprops-with--fallback-true-)
  - [5.3. Problem (Solved): SSR w/ Apollo cache](#53-problem-solved-ssr-w-apollo-cache)
    - [5.3.1. Reference:](#531-reference)
    - [5.3.2. Problem](#532-problem)
  - [5.4. Solution](#54-solution)
    - [5.4.1. SSR](#541-ssr)
    - [5.4.2. Apollo](#542-apollo)
    - [My decision](#my-decision)
      > This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

</details>

<!-- ABOUT THE PROJECT -->

# 1. 👉 About the porject

My personal blog for front-end SPA leveraging Next.js's SSG feature.

## 1.1. Build with

### 1.1.1. Tech Stack

[![TypeScript][typescript]][typescript-url]
[![React][react.js]][react-url]
[![Styled Component][styled-component]][styled-component-url]
[![GraphQL][graphql]][graphql-url]
[![MongoDB][mongodb]][mongodb-url]

### 1.1.2. Features

#### 1.1.2.1. Parallel struture on paragraph (when viewpoint with > 1440px)

- Plain text v.s. code syntax block (#codeBlock or .columnRight)
- Native Language v.s. Foreign Language (#foreignLanguageBlock or .languageRight)

#### 1.1.2.2. Heading thread line style

- Support browser: Notice that the css for Subtitle theard line only works for browsers supporting `:has()` selector(Only Chrome^105 and Safari support)
- Support heading: Only work for heading 2 and heading 3 in fron-end intendedly. Any heading 1 in blog post content could slightly break UI, which is why we convert heading 1 in markdown db into heading 2 as per previos chapter explains.

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

# 2. 👉 Getting Started

## 2.1. Prerequisites

Node version v14.17.0

## 2.2. Installation

1. Clone the repo
   ```sh
   git clone https://github.com/benson00077/tlog-front
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up `.env`

   ```sh
    # /.env.local
    #   connect to backend api listening on port 3001
    NEXT_PUBLIC_API_URL_DEV=http://localhost:3001/graphql
    NEXT_PUBLIC_API_URL_PRO=https://<myDomain>/graphql
   ```

4. Be aware of that mongo db have different URI format by version. The backend logic this porject connect to uses the second one.
   ```sh
   # 1. mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
   # 2. mongodb+srv://[username:password@]host[/[database][?options]]
   ```

## 2.3. Deployment / Hosting

- Use pm2 to manamge muiltiple node apps.
  ```sh
  $ npm run build # as docs suggested
  $ pm2 start npm --name <myAppServerName> -- start
  ```
- P.S. Building as docs' suggest is a bit weird though. See this [Q&A](https://stackoverflow.com/questions/59782255/how-can-i-make-a-minimal-deployment-of-a-next-js-non-static-app/71839401#71839401).

## 2.4. Lint

- Using Conventional Commits.
  - Set up following [conventional-changelog](https://github.com/conventional-changelog/commitlint#what-is-commitlint). Include .husky/commit-msg.
  - See convention [here](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)
  - try locally `echo "foo: dummy commit msg" | ./node_modules/.bin/commitlint`

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- USAGE  -->

# 3. 👉 Usage

## 3.1. Patterns to follow for parallel struture in Blog post data

Foreign language in db is stored like what you do in makrdown codeblock but adding a hint text `language-foreign`, like bellow:

````html
Hello, this paragraph is parallel w/ the below text

```language-foreign
你好，這段文字希望可以跟上面的文字並列(viewpiont width > 1440px)。這在前端渲染時 html 最終會變成 <p> 而不是 <pre> 內的 <code>
```
````

`</br>` is what you want if you want to break row in a same paragraph in db. In other words, break rows by 'enter' would create a new paragraph in final html. `</br>` is what you want to keep parallel feature in same paragraph. Example as below only paragaprh <2> and <4> would be parallel w/ each other :

````html
<1> This paragraph would NOT parallel
<2> This paragraph would parallel w/ below block</br> <3> And this snippet as well !

```language-foreign
<4> 這段存在 DB 的文字，希望最終呈現在 UI 上可以跟上面的文字並列。
```
````

## 3.2. Patterns to follor for better heading in blog post detail pages

- Start your markdown files from heading 1.
- Don't use heading 6.
- Do NOT skip heading number. Make sure keep heading tags in ascending order, esspecially h1 , h2 in markdown file / db.

## 3.3. Heading 1 be converted to 2 automatically in front-end

- Only the title of blog post would be rendered as heading 1 in front-end, regarding that multiple HTML h1 tag is bad for SEO.

  ```
  # 3. 😢 Heading 1 in db

  ## 3.1. 😊 be converted to Heading 2 in front-end
  ### 3.1.1. 😊 Heading 2 > Heading 3, and so on
  ```

  <p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

## 3.4 About blckquote / quote

- Use following two type of quote in markdown
  ```
      1. quote starts w/ two tabs 

      > 2. quote starts with symbol '>'
      >> 3. quote inside quote
  ```
- They are redered as below
  ```html
  <div class="quote">
    <pre> <code> 1. quote starts w/ two tabs <code> </pre>
  </div>

  <blockquote>
    <p> 2. quote starts with symbol '>' </p>
    <blockquote>
      <p> 3. quote inside quote </p>
    </blockquote>  
  </blockquote>
  ```
<!-- ROADMAP -->

# 4. 👉 Roadmap

- [ ] Implement better Post List page
- [ ] Archive page
- [ ] About me page
- [x] Optimize loading animation. Consider using React Spring with next router obj [see me](https://stackoverflow.com/a/59117532/16124226). Or Framer Motion.
- [ ] Set mermaid diagrams as remarkPlugins. [see me](https://github.com/remarkjs/react-markdown/issues/394)
- [ ] Collect the TODOs scatterd around this project
- [ ] Highlight line in code block

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

# 5. 👉 Acknowledgments

## 5.1. Dev Note

- Debounce and Throttle. see [BackToTopBtn.tsx](/components//BackToTopBtn/BackToTopBtn.tsx)
- SSR styled components - w/ `babel-plugin-styled-components` [stackoverflow](https://stackoverflow.com/questions/51791163/warning-prop-classname-did-not-match-when-using-styled-components-with-seman)
- scrollTop w/ requestAnimationFrame

## 5.2. Problem (Pending): slow dev exp using getStaticProps with `{ fallback: true }`

- [getStaticProps with { fallback: true } is very slow when spa routing.](https://github.com/vercel/next.js/issues/13751)

## 5.3. Problem (Solved): SSR w/ Apollo cache

### 5.3.1. Reference:

- [here](https://medium.com/@zhamdi/server-side-rendering-ssr-using-apollo-and-next-js-ac0b2e3ea461) describe the problem and logic duplication between `getServerSideProps` and `useQuery`
- [here](https://github.com/vercel/next.js/discussions/15736) is the discusstions thread
- [here](https://github.com/shshaw/next-apollo-ssr) is the solution provided in that thread

### 5.3.2. Problem

- What if I use `getServerSideProps` with `useQuery()` ?
  - The client is a different instance because there are TWO clients - one one server, that get's reinstated on every request and one on client, that gets hydrated with the data you send yourself in getServerSideProps. If you did not do it, you would refetch all the data on the client again, as the client cache wouldn't be populated.
- P.S. What about the ssrMode option in apollo docs ? [Here](https://stackoverflow.com/a/60342279) referring a solution use next-with-apollo package.

## 5.4. Solution

### 5.4.1. SSR

Has the flag method `getServerSideProps` that lets the lib know you want that specific page to be server-side rendered whilst providing the page component with the data (prefilled in its props argument)

### 5.4.2. Apollo

Has that special method called `getDataFromTree` that finds in your page tree all components that use the hook useQuery. They then execute all queries at once to allow you to send your page prefilled with data to the browser.

### My decision
see comments in code [apollo.ts](./graphql/apollo.ts)

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[react-url]: https://reactjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://v5.reactrouter.com/web/guides/quick-start
[mui-url]: https://mui.com/material-ui/getting-started/overview/
[mui]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[styled-component-url]: https://styled-components.com/docs
[styled-component]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[sass]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[sass-url]: https://sass-lang.com
[nest.js]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[graphql]: https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white
[graphql-url]: https://graphql.org
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com
