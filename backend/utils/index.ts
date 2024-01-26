/**
 *
 * @param {Array} array
 * @returns array items uniqly filtered
 */

export const uniq = (array: any[]): any[] => [...new Set(array)];

/**
 *
 * @param {} order
 * @param {} obj
 * @returns object sorted by enum order
 */

type Enumerator<T> = Record<string, T>;

export const sortObjectByEnumOrder = (
  order: Enumerator<string>,
  obj: Record<any, any>
) => {
  // Sort the keys based on the enum order
  const sortedKeys = Object.keys(order).sort((a, b) => {
    return Object.values(order).indexOf(a) - Object.values(order).indexOf(b);
  });

  // Create a new object with sorted keys
  const sortedResults = sortedKeys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});

  return sortedResults;
};
