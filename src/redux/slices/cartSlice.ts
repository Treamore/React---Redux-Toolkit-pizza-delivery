import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  finder: string;
  quantity: number;
  count: number;
};

interface CartSliceType {
  totalPrice: string;
  totalPizzas: number;
  pizzas: CartType[];
  quantity: number;
}

const initialState: CartSliceType = {
  totalPrice: '0',
  totalPizzas: 0,
  pizzas: [],
  quantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<CartType>) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload.finder);
      if (findPizza) {
        findPizza.count = findPizza.count + action.payload.quantity;
      } else {
        state.pizzas.push({ ...action.payload, count: action.payload.quantity });
      }
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
    plusPizza: (state, action: PayloadAction<string>) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload);
      findPizza && findPizza.count++;
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
    minusPizza: (state, action: PayloadAction<string>) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload);
      if (findPizza && findPizza.count > 1) {
        findPizza.count--;
      } else {
        state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload);
      }
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
    removePizza: (state, action: PayloadAction<string>) => {
      state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload);
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
    clearCart: (state) => {
      state.pizzas = [];
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
  },
});

export const { addPizza, removePizza, clearCart, plusPizza, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
