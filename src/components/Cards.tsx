import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { initialState } from "./../cardSlice";

import Modal from "./Modal";

const Cards = () => {
  const cards = useSelector((state: any) => state.cards.cards);
  const [currentCard, setCurrentCard] = useState(initialState.cards[0]);
  const [action, setAction] = useState("");

  const [isModalShown, setIsModalShown] = useState(false);
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.target as HTMLButtonElement;
    const filteredCard = cards.filter(
      (card: any) => card.id === Number(buttonValue.value)
    );
    setCurrentCard(filteredCard[0]);
    setIsModalShown(true);
    setAction("edit");
  };

  const modalClose = () => setIsModalShown(false);
  const modalOpen = () => {
    setIsModalShown(true);
    setAction("create");
  };
  return (
    <>
      <h1>Your Cards</h1>
      {cards.length > 0 &&
        cards.map((card: any) => (
          <div key={card.id}>
            {card.name} | {card.cardNumber} | {card.expiryDate} | {card.cvc}
            <button value={card.id} onClick={onButtonClick}>
              Edit Card
            </button>
          </div>
        ))}
      <button onClick={modalOpen}>Add New Card</button>
      {action === "edit" ? (
        <Modal
          id={currentCard.id}
          name={currentCard.name}
          cardNumber={currentCard.cardNumber}
          cvc={currentCard.cvc}
          expiryDate={currentCard.expiryDate}
          isShown={isModalShown}
          close={modalClose}
        ></Modal>
      ) : (
        <Modal isShown={isModalShown} close={modalClose}></Modal>
      )}
    </>
  );
};

export default Cards;
