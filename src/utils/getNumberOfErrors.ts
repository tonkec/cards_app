const getNumberOfErrors = (errors: {
  name: string;
  number: string;
  cvc: string;
  date: string;
}) => {
  return Object.values(errors).filter((error) => error === "invalid").length;
};

export default getNumberOfErrors;
