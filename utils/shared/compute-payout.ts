export const computePayout = (
  Interest: string,
  Amount: string,
  Tenure: string
) => {
  const MONTHS_IN_YEAR = 12;
  const PERCENTAGE_DIVISOR = 100;
  const interestNumber = Number(Interest) ?? 0;
  const tenureNumber = Number(Tenure) ?? 0;
  const amountNumber = Number(Amount) ?? 0;
  const payout =
    amountNumber *
    (1 +
      (interestNumber / PERCENTAGE_DIVISOR) * (tenureNumber / MONTHS_IN_YEAR));

  if (!payout) {
    return 0;
  }

  return payout;
};
