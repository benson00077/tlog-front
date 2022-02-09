import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from 'styled-components'

// TODO: process.on undanledRejection and  uncaughtException

/**
 *  example w/ styled component 
 *  https://github.com/vercel/next.js/tree/main/examples/with-styled-components
 */
export default class MyDocument extends Document {
  static async getInitailProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = async () => {
        originalRenderPage({
          enhanceApp: (App) => (props) => (
            sheet.collectStyles(<App {...props} />)
          )
        })

        const initailProps = await Document.getInitialProps(ctx)
        return {
          ...initailProps,
          styles: (
            <>
              {initailProps.styles}
              {sheet.getStyleElement()}
            </>
          )
        }
      }
    } finally {
      sheet.seal()
    }
  }
}