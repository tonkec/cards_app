import CardModel from "../models/Card";
import { useState, MouseEvent } from "react";
import Modal from "./Modal";
const initialCards = [
  {
    id: 1,
    name: "Antonija Simic",
    cardNumber: "4242 4242 4242 4242",
    expiryDate: "10/24",
    cvc: 123,
  },
];

const Cards = () => {
  const [cards, setCards] = useState<CardModel[]>(initialCards);
  const [currentCard, setCurrentCard] = useState<CardModel>(initialCards[0]);
  const [isModalShown, setIsModalShown] = useState(false);
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.target as HTMLButtonElement;
    const filteredCard = cards.filter(
      (card) => card.id === Number(buttonValue.value)
    );
    setCurrentCard(filteredCard[0]);
    setIsModalShown(true);
  };

  const modalClose = () => setIsModalShown(false);
  return (
    <>
      <h1>Your Cards</h1>
      {cards.map((card) => (
        <div key={card.id}>
          {card.name} | {card.cardNumber} | {card.expiryDate} | {card.cvc}
          <button value={card.id} onClick={onButtonClick}>
            Edit Card
          </button>
        </div>
      ))}

      <Modal
        name={currentCard.name}
        cardNumber={currentCard.cardNumber}
        cvc={currentCard.cvc}
        expiryDate={currentCard.expiryDate}
        isShown={isModalShown}
        close={modalClose}
      ></Modal>
    </>
  );
};

export default Cards;
