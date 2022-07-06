import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "../utils/validators";
import {
  validateCreditCardNumber,
  validateCvc,
  validateExpiryDate,
  validateName,
} from "../utils/validators";
import { removeCard, addCard, editCard } from "../reducers/cardSlice";
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
  const [newName, setNewName] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCvc, setNewCvc] = useState("");
  const [error, setError] = useState({
    date: "",
    cvc: "",
    name: "",
    number: "",
    form: "",
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
      setNewCardNumber(inputValue);
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
    if (
      isEmpty(newName) ||
      isEmpty(newCardNumber) ||
      isEmpty(newDate) ||
      String(cvc) === "undefined"
    ) {
      setError((oldError) => ({ ...oldError, form: "invalid" }));
      return false;
    } else {
      setError((oldError) => ({ ...oldError, form: "" }));
      return true;
    }
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
    <div>
      <button onClick={close}>close</button>
      {id && <h1 onClick={handleRemoveCard}>Delete me</h1>}
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          defaultValue={name ? name : ""}
          onChange={onNameChange}
          placeholder="Name"
        />
        <br />
        {error.name !== "" && <span>Name is not valid</span>}
        <input
          type="text"
          defaultValue={cardNumber ? cardNumber : ""}
          placeholder="Card Number"
          onChange={onCardNumberChange}
        />
        <br />
        {error.number !== "" && <span>Card number is not valid</span>}
        <input
          type="text"
          defaultValue={expiryDate ? expiryDate : ""}
          placeholder="Expiry date"
          onChange={onDateChange}
        />
        <br />

        {error.date !== "" && <span>Date is not valid</span>}
        <input
          type="text"
          defaultValue={cvc ? cvc : ""}
          onChange={onCvcChange}
          placeholder="cvc"
        />
        <br />
        {error.cvc !== "" && <span>cvc is not valid</span>}
        {error.form !== "" && <span>Form is not valid</span>}
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default Modal;
