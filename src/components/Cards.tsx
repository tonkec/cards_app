import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { initialState } from "../reducers/cardSlice";
import Card from "./Card";
import Modal from "./Modal";

const Cards = () => {
  const cards = useSelector((state: any) => state.cards.cards);
  const [currentCard, setCurrentCard] = useState(initialState.cards[0]);
  const [action, setAction] = useState("");

  const [isModalShown, setIsModalShown] = useState(false);
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.target as HTMLButtonElement;
    console.log(e);
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
      <h1 className="text-xl text-purple font-bold mt-6">Your Cards</h1>
      <p className="text-gray text-sm mb-6">
        Add, edit or delete your cards any time.
      </p>
      {cards.length > 0 &&
        cards.map((card: any) => (
          <Card card={card} onButtonClick={onButtonClick} />
        ))}
      <button
        onClick={modalOpen}
        className="bg-purple text-white rounded-xl w-full block py-3 mt-6 font-bold text-md"
      >
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
