export const convertToVND = (usdPrice) => {
  if (!usdPrice && usdPrice !== 0) return 0;
  // If price is already a number, use it directly
  const usdAmount =
    typeof usdPrice === "number"
      ? usdPrice
      : parseFloat(usdPrice.toString().replace(/[^0-9.]/g, ""));
  return Math.round(usdAmount * 25000);
};
