

export const formatDate = (ISOString: string, format = 'YYYY/M/D') => {
  return new Date(ISOString).toLocaleDateString()
}

export const isSafari = /Safari/.test(globalThis.navigator?.userAgent) && /Apple Computer/.test(globalThis.navigator?.vendor);
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(globalThis.navigator?.userAgent);