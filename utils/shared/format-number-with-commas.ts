export function formatNumberWithCommas(number: string): string {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}
