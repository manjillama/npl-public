export function uptoTwoDecimal(num: number) {
  return Number(num.toFixed(2));
}

export function isNumber(number: any) {
  return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
}
