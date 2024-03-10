export function formatNumberWithCommas(number: string): string {
  const regex = /^\d*\.?\d+$/;
  if (!regex.test(number.toString())) {
    return number;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
}
