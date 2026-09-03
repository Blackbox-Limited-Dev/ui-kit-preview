/** Digits the mask can hold — `'00 000 00 00'` → `9`. */
export const maskDigitCount = (mask: string): number =>
  mask.replace(/\D/g, '').length

/** Strips everything but digits and clamps to what the mask can hold. */
export const toDigits = (value: string, mask: string): string =>
  value.replace(/\D/g, '').slice(0, maskDigitCount(mask))

/** Formats digits against a mask where every `0-9` is a digit placeholder and
 *  every other character is a literal — `'501234567'` → `'50 123 45 67'`. */
export const applyMask = (value: string, mask: string): string => {
  const digits = value.replace(/\D/g, '')
  let result = ''
  let index = 0

  for (const char of mask) {
    if (index >= digits.length) break

    if (/\d/.test(char)) {
      result += digits[index]
      index += 1
    } else {
      result += char
    }
  }

  return result
}
