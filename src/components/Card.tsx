import CardModel from "../models/Card";
import editIcon from "./../assets/edit-icon.svg";
import mastercardIcon from "./../assets/mastercard-logo.svg";
import visaIcon from "./../assets/visa-logo.svg";
interface Props {
  card: CardModel;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Card = ({ card, onButtonClick }: Props) => {
  const cardTypeClass =
    card.cardType === "mastercard"
      ? "bg-purple-100 bg-card-purple text-white-100"
      : "bg-blue bg-card-green text-black";
  return (
    <div
      className={`${cardTypeClass} rounded-sm p-3 relative mb-6 bg-right bg-no-repeat bg-cover`}
      key={card.id}
    >
      <header className="relative right-3 flex pb-8">
        <div className="absolute left-3 text-xl">
          {card.cardType === "mastercard" ? (
            <img src={mastercardIcon} alt="mastercard-icon" className="mt-1" />
          ) : (
            <img src={visaIcon} alt="visa-icon" className="mt-1" />
          )}
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
        <h5 className="font-bold text-md mt-8 mb-2 text-white-100">
          {card.name}
        </h5>
        {card.cardNumber}
      </section>
      <footer className="absolute right-5 bottom-3">
        <button value={card.id} onClick={onButtonClick}>
          <img src={editIcon} alt="edit" />
        </button>
      </footer>
    </div>
  );
};

export default Card;
