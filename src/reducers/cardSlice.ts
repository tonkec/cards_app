import { createSlice } from "@reduxjs/toolkit";
import CardModel from "../models/Card";

export interface CardState {
  cards: CardModel[];
}

export const initialState: CardState = {
  cards: [
    {
      id: 1,
      name: "Antonija Simic",
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "10/24",
      cvc: 123,
      type: "visa",
    },
  ],
};

export const CardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const cardTypes = ["visa", "mastercard"];
      const cardTypeIndex = Math.floor(Math.random() * 2);
      const card = {
        id: Math.random() * 100,
        name: action.payload.name,
        cardNumber: action.payload.cardNumber,
        cvc: action.payload.cvc,
        expiryDate: action.payload.expiryDate,
        type: cardTypes[cardTypeIndex],
      } as CardModel;
      state.cards.push(card);
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    editCard: (state, action) => {
      const index = state.cards.findIndex(
        (tutorial) => tutorial.id === action.payload.id
      );
      state.cards[index] = {
        ...state.cards[index],
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, removeCard, editCard } = CardSlice.actions;

export default CardSlice.reducer;
