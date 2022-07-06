import { SiMastercard } from "react-icons/si";
const Card = (props: any) => {
  return (
    <div
      className="bg-purple2 text-white rounded-sm p-3 relative"
      key={props.card.id}
    >
      <header className="relative right-3 flex pb-8">
        <div className="absolute left-3 text-xl">
          <SiMastercard />
        </div>
        <div className="absolute right-0 flex">
          <div className="mr-4">
            <h6 className="text-xs">CVC</h6>
            <span className="font-bold text-white text-sm">
              {props.card.expiryDate}
            </span>
          </div>
          <div>
            <h6 className="text-xs">Expires</h6>
            <span className="font-bold text-white text-sm">
              {props.card.expiryDate}
            </span>
          </div>
        </div>
      </header>
      <section>
        <h5 className="font-bold text-md mt-8 mb-2"> {props.card.name} </h5>
        {props.card.cardNumber}
      </section>
      <footer className="absolute right-5 bottom-3">
        <button value={props.card.id} onClick={props.onButtonClick}>
          Edit
        </button>
      </footer>
    </div>
  );
};

export default Card;
