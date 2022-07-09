export default interface FormError {
  error: {
    name: string;
    number: string;
    date: string;
    cvc: string;
  };
  errorType: ErrorType;
}

type ErrorType = "name" | "number" | "date" | "cvc";
