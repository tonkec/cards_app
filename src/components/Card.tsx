import { SiMastercard } from "react-icons/si";
import { FiEdit2 } from "react-icons/fi";
import CardModel from "../models/Card";
interface Props {
  card: CardModel;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}
const Card = ({ card, onButtonClick }: Props) => {
  return (
    <div
      className="bg-purple-100 text-white-100 rounded-sm p-3 relative mb-6"
      key={card.id}
    >
      <header className="relative right-3 flex pb-8">
        <div className="absolute left-3 text-xl">
          <SiMastercard />
        </div>
        <div className="absolute right-0 flex">
          <div className="mr-4">
            <h6 className="text-xs">CVC</h6>
            <span className="font-bold text-white-100 text-sm">{card.cvc}</span>
          </div>
          <div>
            <h6 className="text-xs">Expires</h6>
            <span className="font-bold text-white-100 text-sm">
              {card.expiryDate}
            </span>
          </div>
        </div>
      </header>
      <section>
        <h5 className="font-bold text-md mt-8 mb-2"> {card.name} </h5>
        {card.cardNumber}
      </section>
      <footer className="absolute right-5 bottom-3">
        <button value={card.id} onClick={onButtonClick}>
          <FiEdit2 />
        </button>
      </footer>
    </div>
  );
};

export default Card;
