

export const formatDate = (ISOString: string, format = 'YYYY/M/D') => {
  return new Date(ISOString).toLocaleDateString()
}