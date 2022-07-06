import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
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
    console.log("click");
    dispatch(removeCard(id));
    close();
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      Modal
      <button onClick={close}>close</button>
      {id && <h1 onClick={handleRemoveCard}>Delete me</h1>}
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          defaultValue={name ? name : ""}
          onChange={onNameChange}
          placeholder="Name"
        />
        <input
          type="text"
          defaultValue={cardNumber ? cardNumber : ""}
          placeholder="Card Number"
          onChange={onCardNumberChange}
        />
        <input
          type="text"
          defaultValue={expiryDate ? expiryDate : ""}
          placeholder="Expiry date"
          onChange={onDateChange}
        />
        <input
          type="text"
          defaultValue={cvc ? cvc : ""}
          onChange={onCvcChange}
          placeholder="cvc"
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default Modal;
