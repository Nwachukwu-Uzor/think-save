export function addMonthsToDate(inputDateStr: string, n: number) {
  if (!inputDateStr || !n) {
    return "";
  }
  const inputDate = new Date(inputDateStr);

  const currentMonth = inputDate.getMonth();
  inputDate.setMonth(currentMonth + n);
  if (inputDate.getDate() != Number(inputDateStr.slice(-2))) {
    inputDate.setDate(0);
  }
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  return `${year}-${month < 10 ? "0" : ""}${month}-${inputDate.getDate()}`;
}
