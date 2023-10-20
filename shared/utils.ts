export const formatDate = (ISOString: string) => {
  const myBcp47LanguageTags = ['ko-KR', 'zh-TW']
  return new Date(ISOString).toLocaleDateString(myBcp47LanguageTags[1])
}

export const isSafari =
  /Safari/.test(globalThis.navigator?.userAgent) && /Apple Computer/.test(globalThis.navigator?.vendor)
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  globalThis.navigator?.userAgent,
)
