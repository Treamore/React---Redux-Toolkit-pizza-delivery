import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const countTotalPrice = (items: CartType[]) => {
  return items
    .reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0)
    .toFixed(2);
};

const countTotalPizzas = (items: CartType[]) => {
  return items.reduce((sum, obj) => {
    return 1 * obj.count + sum;
  }, 0);
};

const LS = () => {
  const data = localStorage.getItem('pizzas');
  const items = data ? JSON.parse(data) : [];
  const itemsCount = countTotalPizzas(items);
  const itemsPrice = countTotalPrice(items);
  return { items, itemsCount, itemsPrice };
};

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

const { items, itemsCount, itemsPrice } = LS();

const initialState: CartSliceType = {
  pizzas: items,
  totalPrice: itemsPrice,
  totalPizzas: itemsCount,
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
      state.totalPrice = countTotalPrice(state.pizzas);
      state.totalPizzas = countTotalPizzas(state.pizzas);
    },
    plusPizza: (state, action: PayloadAction<string>) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload);
      findPizza && findPizza.count++;
      state.totalPrice = countTotalPrice(state.pizzas);
      state.totalPizzas = countTotalPizzas(state.pizzas);
    },
    minusPizza: (state, action: PayloadAction<string>) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload);
      if (findPizza && findPizza.count > 1) {
        findPizza.count--;
      } else {
        state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload);
      }
      state.totalPrice = countTotalPrice(state.pizzas);
      state.totalPizzas = countTotalPizzas(state.pizzas);
    },
    removePizza: (state, action: PayloadAction<string>) => {
      state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload);
      state.totalPrice = countTotalPrice(state.pizzas);
      state.totalPizzas = countTotalPizzas(state.pizzas);
    },
    clearCart: (state) => {
      state.pizzas = [];
      state.totalPrice = countTotalPrice(state.pizzas);
      state.totalPizzas = countTotalPizzas(state.pizzas);
    },
  },
});

export const { addPizza, removePizza, clearCart, plusPizza, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
