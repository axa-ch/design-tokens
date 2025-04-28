export const replaceStyleDictionaryFontSizesWithTailwindFontSizes = (tokenName: string, itemNumber: string) => {
  if (itemNumber === '1') {
    return tokenName.replace('1', 'xs');
  }
  if (itemNumber === '2') {
    return tokenName.replace('2', 'sm');
  }
  if (itemNumber === '3') {
    return tokenName.replace('3', 'base');
  }
  if (itemNumber === '4') {
    return tokenName.replace('4', 'lg');
  }
  if (itemNumber === '5') {
    return tokenName.replace('5', 'xl');
  }
  if (itemNumber === '6') {
    return tokenName.replace('6', '2xl');
  }
  if (itemNumber === '7') {
    return tokenName.replace('7', '3xl');
  }
  if (itemNumber === '8') {
    return tokenName.replace('8', '4xl');
  }
  if (itemNumber === '9') {
    return tokenName.replace('9', '5xl');
  }
  if (itemNumber === '10') {
    return tokenName.replace('10', '6xl');
  }
};
