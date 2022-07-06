import { useState, FormEvent } from "react";

interface ModalProps {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvc: number;
  isShown: boolean;
  close: () => void;
}

const Modal = (props: ModalProps) => {
  const { name, cardNumber, expiryDate, cvc, isShown, close } = props;
  const [newName, setNewName] = useState("");

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setNewName(inputValue);
  };

  const onFormSubmit = () => {};

  if (!isShown) {
    return null;
  }

  return (
    <div>
      Modal
      <h1>
        {name} | {cardNumber} | {expiryDate} | {cvc}
      </h1>
      <button onClick={close}>close</button>
      <form onSubmit={onFormSubmit}>
        <input type="text" value={name} onChange={onChange} />
      </form>
    </div>
  );
};

export default Modal;
