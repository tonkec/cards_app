import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "../utils/validators";
import {
  validateCreditCardNumber,
  validateCvc,
  validateExpiryDate,
  validateName,
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
interface ModalProps {
  id?: number;
  name?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvc?: number;
  isShown: boolean;
  close: () => void;
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
      setError((oldError) => ({ ...oldError, name: "" }));
      setNewName(inputValue);
    }
  };

  const onCardNumberChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;

    if (!validateCreditCardNumber(inputValue)) {
      setError((oldError) => ({ ...oldError, number: "invalid" }));
    } else {
      setError((oldError) => ({ ...oldError, number: "" }));
      setNewCardNumber(formatCardNumber(inputValue));
    }
  };

  const onDateChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (!validateExpiryDate(inputValue)) {
      setError((oldError) => ({ ...oldError, date: "invalid" }));
    } else {
      setError((oldError) => ({ ...oldError, date: "" }));
      setNewDate(inputValue);
    }
  };

  const onCvcChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    console.log(validateCvc(inputValue));
    if (!validateCvc(inputValue)) {
      setError((oldError) => ({ ...oldError, cvc: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, cvc: "" }));
      setNewCvc(inputValue);
    }
  };

  const handleRemoveCard = () => {
    dispatch(removeCard(id));
    close();
  };

  const isFormValid = () => {
    const nextError = { ...error };
    nextError.name = isEmpty(newName) ? "invalid" : "";
    nextError.number = isEmpty(newCardNumber) ? "invalid" : "";
    nextError.cvc = isEmpty(String(newCvc)) ? "invalid" : "";
    nextError.date = isEmpty(newDate) ? "invalid" : "";

    const numberOfErrors = Object.values(nextError).filter(
      (error) => error === "invalid"
    );
    setError(nextError);

    if (numberOfErrors.length > 0) {
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
        <section
          className={`bg-white-100 px-4 py-8 rounded-md relative top-1/2 -translate-y-1/2`}
        >
          <h2 className="text-black font-black mb-6 text-lg">
            {id ? "Edit your card" : "Add your card details"}
          </h2>
          <button onClick={close} className="absolute top-4 right-4 font-bold">
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
          <form onSubmit={onFormSubmit} className="w-full">
            <label htmlFor="name" className={label}>
              Name in card
            </label>
            <input
              className={error.name !== "" ? errorInput : input}
              type="text"
              defaultValue={name ? name : ""}
              onChange={onNameChange}
              placeholder="John Doe"
              id="name"
            />

            {error.name !== "" && (
              <span className={errorMessage}>Name is not valid</span>
            )}
            <label htmlFor="cn" className={label}>
              Card number
            </label>
            <input
              className={error.number !== "" ? errorInput : input}
              type="text"
              defaultValue={cardNumber ? cardNumber : ""}
              placeholder="0000 0000 0000 0000"
              onChange={onCardNumberChange}
              id="cn"
            />

            {error.number !== "" && (
              <span className={errorMessage}>Card number is not valid</span>
            )}
            <label htmlFor="date" className={label}>
              Expiry date
            </label>
            <input
              className={error.date !== "" ? errorInput : input}
              type="text"
              defaultValue={expiryDate ? expiryDate : ""}
              placeholder="00/00"
              onChange={onDateChange}
              id="date"
            />

            {error.date !== "" && (
              <span className={errorMessage}>Date is not valid</span>
            )}
            <label htmlFor="cvc" className={label}>
              CVC (security code)
            </label>
            <input
              className={error.cvc !== "" ? errorInput : input}
              type="text"
              defaultValue={cvc ? cvc : ""}
              onChange={onCvcChange}
              placeholder="000"
              id="cvc"
            />

            {error.cvc !== "" && (
              <span className={errorMessage}>cvc is not valid</span>
            )}

            <input type="submit" value="Confirm" className={`${button} mt-8`} />
          </form>
        </section>
      </div>
    </>
  );
};

export default Modal;
