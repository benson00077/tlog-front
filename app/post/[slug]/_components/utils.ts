export function getAnchor(markdownHeading: string) {
  /** 'z' to avoid id begins with digits. ref: https://stackoverflow.com/questions/70579/html-valid-id-attribute-values */
  const anchorTargetId = `z${markdownHeading.replace(/ /g, '-').replace(/\./g, '-').toLowerCase()}`
  const anchorHref = '#' + anchorTargetId
  return {
    anchorTargetId,
    anchorHref,
  }
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
