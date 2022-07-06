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
    if (!validateExpiryDate(input.expiryDate.value)) {
      console.log("date is not valid");
      return;
    }
    if (!validateName(input.name.value)) {
      console.log("name can't be empty");
      return;
    }

    if (!validateCreditCardNumber(input.cardNumber.value)) {
      console.log("cn is invalid");
      return;
    }

    if (!validateCvc(input.cvc.value)) {
      console.log("cvc is invalid");
      return;
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
    } else {
      dispatch(addCard(payload));
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
        <input
          type="text"
          defaultValue={cardNumber ? cardNumber : ""}
          placeholder="Card Number"
          onChange={onCardNumberChange}
          name="cardNumber"
        />
        <input
          type="text"
          defaultValue={expiryDate ? expiryDate : ""}
          placeholder="Expiry date"
          onChange={onDateChange}
          name="expiryDate"
        />
        <input
          type="text"
          defaultValue={cvc ? cvc : ""}
          onChange={onCvcChange}
          placeholder="cvc"
          name="cvc"
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default Modal;
