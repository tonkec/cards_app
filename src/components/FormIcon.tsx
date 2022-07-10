import FormError from "./../models/FormError";
import ErrorIcon from "../assets/form-error.svg";
import SuccessIcon from "../assets/form-success.svg";
const FormIcon = ({ error, errorType }: FormError) => (
  <span className="absolute top-[30px] right-2">
    {error[errorType] === "valid" && <img src={SuccessIcon} alt="success" />}
    {error[errorType] === "invalid" && <img src={ErrorIcon} alt="error" />}
  </span>
);

export default FormIcon;
