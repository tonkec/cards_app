export default interface CardModel {
  id: number;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvc: number;
  type: CardType;
}

type CardType = "visa" | "mastercard";
