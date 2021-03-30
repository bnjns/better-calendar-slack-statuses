export const removeExtraWhitespace = (text: string): string => text.replace(/([\s]{2,})/g, ' ').trim()
