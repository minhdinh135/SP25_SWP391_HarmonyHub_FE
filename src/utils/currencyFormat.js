export const formatCurrencyInVND = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount) ?? 0;
};
