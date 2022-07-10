export default interface CardModel {
  id: number;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvc: number;
  cardType: CardType;
}

export type CardType = "visa" | "mastercard";
