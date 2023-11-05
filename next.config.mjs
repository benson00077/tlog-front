import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
/* eslint @typescript-eslint/no-var-requires: "off" */
import remarkSectionize from 'remark-sectionize'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  experimental: {
    mdxRs: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mermaid-js.github.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})
export default withMDX(nextConfig)
