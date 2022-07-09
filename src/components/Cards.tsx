import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { initialState } from "../reducers/cardSlice";
import Card from "./Card";
import Modal from "./Modal";
import { button } from "../styles/Components";
import { RootState } from "../store/store";
const Cards = () => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [currentCard, setCurrentCard] = useState(initialState.cards[0]);
  const [action, setAction] = useState("");

  const [isModalShown, setIsModalShown] = useState(false);
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.currentTarget as HTMLButtonElement;
    const filteredCard = cards.filter(
      (card) => card.id === Number(buttonValue.value)
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
      <h1 className="text-xl text-purple-100 font-bold mt-6">Your Cards</h1>
      <p className="text-gray-200 text-sm mb-6">
        Add, edit or delete your cards any time.
      </p>
      {cards.length > 0 &&
        cards.map((card) => (
          <Card key={card.id} card={card} onButtonClick={onButtonClick} />
        ))}
      <button onClick={modalOpen} className={`${button} mt-6`}>
        Add new card
      </button>
      {action === "edit" ? (
        <Modal
          key={isModalShown ? "open" : "closed"}
          id={currentCard.id}
          name={currentCard.name}
          cardNumber={currentCard.cardNumber}
          cvc={currentCard.cvc}
          expiryDate={currentCard.expiryDate}
          isShown={isModalShown}
          cardType={currentCard.cardType}
          close={modalClose}
        ></Modal>
      ) : (
        <Modal
          key={isModalShown ? "open" : "closed"}
          isShown={isModalShown}
          close={modalClose}
        ></Modal>
      )}
    </>
  );
};

export default Cards;
