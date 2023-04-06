export const buildQueryString = (
  params: Record<string, string | string[]>
): string => {
  const keyValuePairs = []

  for (const key in params) {
    const item = params[key]
    if (Array.isArray(item)) {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${item.map(encodeURIComponent).join(',')}`
      )
    } else {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
      )
    }
  }

  return keyValuePairs.join('&')
}
