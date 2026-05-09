/** Standard amortising loan: fixed monthly payment (principal + interest). */
export function monthlyMortgagePayment(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRatePct / 100 / 12;
  const n = Math.max(1, Math.round(years * 12));
  if (monthlyRate <= 0) return principal / n;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}
