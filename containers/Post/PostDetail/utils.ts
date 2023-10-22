import tocbot from 'tocbot'

/**
 *  NOTE: toc is not shown in server side (checked by View Page Source)
 */
export function setupTocbot() {
  tocbot.init({
    tocSelector: '.tableOfContents',
    contentSelector: '.postContentByToc',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    collapseDepth: 0,
    isCollapsedClass: 'is-collapsed',
    collapsibleClass: 'is-collapsible',
  })
}

/**
 *  @Usage Callback ref for UI Layout of
 *         languageLeft (text) <-> languageRight (text)
 */
export function setLanguageLeft(foreignLangBlock: HTMLDivElement) {
  const previouseEle = foreignLangBlock?.previousElementSibling
  if (previouseEle && !previouseEle.classList.contains('languageRight')) {
    previouseEle?.classList.add('languageLeft')
  }
}
/**
 *  @Usage Callback ref for UI Layout of
 *         columnLeft (text) <-> columnRight (code)
 *  @Note  Callback only trigger on client side, no server side call.
 */
export function setColumnLeft(columnRight: HTMLPreElement) {
  const previouseEle = columnRight?.previousElementSibling // mostly <p> or <ul> in my usecase
  if (previouseEle?.tagName === 'P') {
    // Filter out h1~h6, table , ul, li. Don't make them parallel w/ code block
    previouseEle?.classList.add('columnLeft')
  } else {
    // Notice: this intentedly overide .cloumnRight css width and make float:left not work
    columnRight?.setAttribute('style', 'width: 100%;')
  }
}
