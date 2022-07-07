export const formatCardNumber = (cardNumber: string) => {
  const arr = cardNumber.match(/[\s\S]{1,4}/g) || [];
  return arr.join(" ");
};
