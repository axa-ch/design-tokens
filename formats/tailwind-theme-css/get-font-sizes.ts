export const replaceStyleDictionaryFontSizesWithTailwindFontSizes = (tokenName: string, itemNumber: string) => {
  const sizeMapping: Record<string, string> = {
    '1': 'xs',
    '2': 'sm',
    '3': 'base',
    '4': 'lg',
    '5': 'xl',
    '6': '2xl',
    '7': '3xl',
    '8': '4xl',
    '9': '5xl',
    '10': '6xl',
  };

  return sizeMapping[itemNumber] ? tokenName.replace(itemNumber, sizeMapping[itemNumber]) : tokenName;
};
