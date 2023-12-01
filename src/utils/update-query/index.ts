/**
 *
 * @param query
 * @param watchedKeys
 * @param watchedKeysValues
 * @returns queryString to search
 */
export function updateQuery(
  query: { [key: string]: string },
  watchedKeys: string[],
  watchedKeysValues: string[],
): string {
  let currentQuery = ''
  watchedKeys.map((watchedKey, index) => {
    currentQuery +=
      index > 0
        ? `&${watchedKey}=${watchedKeysValues[index]}`
        : `${watchedKey}=${watchedKeysValues[index]}`
    return true
  })

  Object.keys(query).forEach((queryKey) => {
    if (!watchedKeys.includes(queryKey)) {
      currentQuery +=
        currentQuery.length > 0
          ? `&${queryKey}=${query[queryKey]}`
          : `${queryKey}=${query[queryKey]}`
    }
  })

  return currentQuery
}
