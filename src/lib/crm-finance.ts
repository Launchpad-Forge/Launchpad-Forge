export function cents(amount: number) {
  if (!Number.isFinite(amount) || amount < 0 || Math.abs(amount * 100 - Math.round(amount * 100)) > 0.000001) throw new Error('Amounts must be nonnegative with at most two decimal places.');
  const result = Math.round(amount * 100);
  if (!Number.isSafeInteger(result)) throw new Error('Amount is too large.');
  return result;
}
export function invoiceTotal(subtotal: number, discount: number, tax: number) {
  const total = cents(subtotal) - cents(discount) + cents(tax);
  if (total < 0) throw new Error('Discount exceeds subtotal plus tax.');
  return total / 100;
}
export function paymentStatus(total: number, paid: number) {
  return cents(paid) > 0 ? cents(paid) >= cents(total) ? 'Paid' : 'Partially Paid' : 'Sent';
}
export function validatePayment(total: number, paid: number, amount: number) {
  if (cents(amount) <= 0) throw new Error('Payment must be positive.');
  if (cents(paid) + cents(amount) > cents(total)) throw new Error('Payment exceeds the outstanding balance.');
}
