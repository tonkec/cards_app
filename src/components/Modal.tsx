import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  validateCreditCardNumber,
  validateCvc,
  validateExpiryDate,
  validateName,
} from "../utils/validators";
import { removeCard, addCard, editCard } from "./../cardSlice";
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
  });
  const dispatch = useDispatch();

  if (!isShown) {
    return null;
  }

  const onNameChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setNewName(inputValue);
  };

  const onCardNumberChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setNewCardNumber(inputValue);
  };

  const onDateChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setNewDate(inputValue);
  };

  const onCvcChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setNewCvc(inputValue);
  };

  const handleRemoveCard = () => {
    dispatch(removeCard(id));
    close();
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.target as any;
    if (!validateName(input.name.value)) {
      setError((oldError) => ({ ...oldError, name: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, name: "" }));
    }

    if (!validateCreditCardNumber(input.cardNumber.value)) {
      setError((oldError) => ({ ...oldError, number: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, number: "" }));
    }

    if (!validateExpiryDate(input.expiryDate.value)) {
      setError((oldError) => ({ ...oldError, date: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, date: "" }));
    }

    if (!validateCvc(input.cvc.value)) {
      setError((oldError) => ({ ...oldError, cvc: "invalid" }));
      return;
    } else {
      setError((oldError) => ({ ...oldError, cvc: "" }));
    }

    const payload = {
      id: id,
      name: newName === "" ? name : newName,
      cardNumber: newCardNumber === "" ? cardNumber : newCardNumber,
      expiryDate: newDate === "" ? expiryDate : newDate,
      cvc: newCvc === "" ? cvc : newCvc,
    };

    if (id) {
      dispatch(editCard(payload));
      close();
    } else {
      dispatch(addCard(payload));
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
          name="name"
        />
        <br />
        {error.name !== "" && <span>Name is not valid</span>}
        <input
          type="text"
          defaultValue={cardNumber ? cardNumber : ""}
          placeholder="Card Number"
          onChange={onCardNumberChange}
          name="cardNumber"
        />
        <br />
        {error.number !== "" && <span>Card number is not valid</span>}
        <input
          type="text"
          defaultValue={expiryDate ? expiryDate : ""}
          placeholder="Expiry date"
          onChange={onDateChange}
          name="expiryDate"
        />{" "}
        <br />
        {error.date !== "" && <span>Date is not valid</span>}
        <input
          type="text"
          defaultValue={cvc ? cvc : ""}
          onChange={onCvcChange}
          placeholder="cvc"
          name="cvc"
        />
        <br />
        {error.cvc !== "" && <span>cvc is not valid</span>}
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default Modal;
