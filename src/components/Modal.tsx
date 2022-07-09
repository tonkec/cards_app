import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  validateCreditCardNumber,
  validateCvc,
  validateExpiryDate,
  validateName,
  isEmpty,
} from "../utils/validators";
import {
  input,
  label,
  modal,
  button,
  errorMessage,
  errorInput,
} from "../styles/Components";
import { removeCard, addCard, editCard } from "../reducers/cardSlice";
import { CgClose } from "react-icons/cg";
import { formatCardNumber } from "../utils/cardNumberFormatter";
import FormError from "./../models/FormError";
import ErrorIcon from "../assets/form-error.svg";
import SuccessIcon from "../assets/form-success.svg";
interface ModalProps
  extends Partial<{
    id: number;
    name: string;
    cardNumber: string;
    expiryDate: string;
    cvc: number;
  }> {
  isShown: boolean;
  close: () => void;
}

function getNumberOfErrors(errors: {
  name: string;
  number: string;
  cvc: string;
  date: string;
}) {
  return Object.values(errors).filter((error) => error === "invalid").length;
}

const Modal = (props: ModalProps) => {
  const { name, cardNumber, expiryDate, cvc, isShown, close, id } = props;
  const [newName, setNewName] = useState(name ? name : "");
  const [newCardNumber, setNewCardNumber] = useState(
    cardNumber ? cardNumber : ""
  );
  const [newDate, setNewDate] = useState(expiryDate ? expiryDate : "");
  const [newCvc, setNewCvc] = useState(cvc ? cvc : "");
  const [error, setError] = useState({
    date: "",
    cvc: "",
    name: "",
    number: "",
  });
  const dispatch = useDispatch();

  if (!isShown) {
    return null;
  }

  const onNameChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (!validateName(inputValue)) {
      setError((oldError) => ({ ...oldError, name: "invalid" }));
    } else {
      setError((oldError) => ({ ...oldError, name: "valid" }));
      setNewName(inputValue);
    }
  };

  const onCardNumberChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;

    if (!validateCreditCardNumber(inputValue)) {
      setError((oldError) => ({ ...oldError, number: "invalid" }));
    } else {
      setError((oldError) => ({ ...oldError, number: "valid" }));
      setNewCardNumber(formatCardNumber(inputValue));
    }
  };

  const onDateChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (!validateExpiryDate(inputValue)) {
      setError((oldError) => ({ ...oldError, date: "invalid" }));
    } else {
      setError((oldError) => ({ ...oldError, date: "valid" }));
      setNewDate(inputValue);
    }
  };

  const onCvcChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (!validateCvc(inputValue)) {
      setError((oldError) => ({ ...oldError, cvc: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, cvc: "valid" }));
      setNewCvc(inputValue);
    }
  };

  const handleRemoveCard = () => {
    dispatch(removeCard(id));
    close();
  };

  const isFormValid = () => {
    const nextError = { ...error };
    nextError.name = isEmpty(newName) ? "invalid" : "valid";
    nextError.number = isEmpty(newCardNumber) ? "invalid" : "valid";
    nextError.cvc = isEmpty(String(newCvc)) ? "invalid" : "valid";
    nextError.date = isEmpty(newDate) ? "invalid" : "valid";

    const numberOfErrors = getNumberOfErrors(nextError);
    setError(nextError);

    if (numberOfErrors > 0) {
      return false;
    }
    return true;
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      const payload = {
        id: id,
        name: newName === "" ? name : newName,
        cardNumber: newCardNumber === "" ? cardNumber : newCardNumber,
        expiryDate: newDate === "" ? expiryDate : newDate,
        cvc: newCvc === "" ? cvc : newCvc,
      };

      if (id) {
        dispatch(editCard(payload));
      } else {
        dispatch(addCard(payload));
      }

      close();
    }
  };

  return (
    <>
      <div className="fixed bg-black opacity-40 -z-10 inset-0"></div>
      <div className={modal}>
        <div className="flex items-center justify-center min-h-full">
          <section className="bg-white-100 px-4 py-8 rounded-md relative w-full my-6 max-w-sm">
            <h2 className="text-black font-black mb-6 text-lg">
              {id ? "Edit your card" : "Add your card details"}
            </h2>
            <button
              onClick={close}
              className="absolute top-4 right-4 font-bold"
            >
              <CgClose />
            </button>
            {id && (
              <h1
                className="text-3xl font-bold underline"
                onClick={handleRemoveCard}
              >
                Delete me
              </h1>
            )}
            <form onSubmit={onFormSubmit} className="w-full relative">
              <label htmlFor="name" className={label}>
                Name in card
                <FormIcon error={error} errorType="name" />
              </label>
              <input
                className={error.name === "invalid" ? errorInput : input}
                type="text"
                defaultValue={name ? name : ""}
                onChange={onNameChange}
                placeholder="John Doe"
                id="name"
              />
              <ErrorMessage error={error} errorType="name" />

              <label htmlFor="cn" className={label}>
                Card number
                <FormIcon error={error} errorType="number" />
              </label>
              <input
                className={error.number === "invalid" ? errorInput : input}
                type="text"
                defaultValue={cardNumber ? cardNumber : ""}
                placeholder="0000 0000 0000 0000"
                onChange={onCardNumberChange}
                id="cn"
              />
              <ErrorMessage error={error} errorType="number" />

              <label htmlFor="date" className={label}>
                Expiry date
                <FormIcon error={error} errorType="date" />
              </label>
              <input
                className={error.date === "invalid" ? errorInput : input}
                type="text"
                defaultValue={expiryDate ? expiryDate : ""}
                placeholder="00/00"
                onChange={onDateChange}
                id="date"
              />
              <ErrorMessage error={error} errorType="date" />

              <label htmlFor="cvc" className={label}>
                CVC (security code)
                <FormIcon error={error} errorType="cvc" />
              </label>
              <input
                className={error.cvc === "invalid" ? errorInput : input}
                type="text"
                defaultValue={cvc ? cvc : ""}
                onChange={onCvcChange}
                placeholder="000"
                id="cvc"
              />
              <ErrorMessage error={error} errorType="cvc" />

              <input
                type="submit"
                value="Confirm"
                className={`${button} mt-8`}
                disabled={
                  getNumberOfErrors(error) > 0 ||
                  newDate === "" ||
                  newCvc === "" ||
                  newCardNumber === "" ||
                  newName === ""
                }
              />
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Modal;

const FormIcon = ({ error, errorType }: FormError) => (
  <span className="absolute top-[30px] right-2">
    {error[errorType] === "valid" && <img src={SuccessIcon} alt="success" />}
    {error[errorType] === "invalid" && <img src={ErrorIcon} alt="error" />}
  </span>
);

const ErrorMessage = ({ error, errorType }: FormError) => {
  if (error[errorType] === "valid" || error[errorType] === "") {
    return null;
  }
  return <span className={errorMessage}>{errorType} is not valid</span>;
};
