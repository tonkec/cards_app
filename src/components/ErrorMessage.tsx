import { errorMessage } from "../styles/Components";
import FormError from "./../models/FormError";
const ErrorMessage = ({ error, errorType }: FormError) => {
  if (error[errorType] === "valid" || error[errorType] === "") {
    return null;
  }
  return <span className={errorMessage}>{errorType} is not valid</span>;
};

export default ErrorMessage;
