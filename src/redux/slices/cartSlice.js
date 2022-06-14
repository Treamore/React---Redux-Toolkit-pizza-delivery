import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalPizzas: 0,
  pizzas: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload.finder);
      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
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
    plusPizza: (state, action) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload.finder);
      findPizza.count++;
      state.totalPrice = state.pizzas
        .reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0)
        .toFixed(2);
      state.totalPizzas = state.pizzas.reduce((sum, obj) => {
        return 1 * obj.count + sum;
      }, 0);
    },
    minusPizza: (state, action) => {
      const findPizza = state.pizzas.find((obj) => obj.finder === action.payload.finder);
      if (findPizza.count > 1) {
        findPizza.count--;
        console.log(findPizza.count);
        console.log(action.payload.finder);
      } else {
        console.log(action.payload.finder);
        console.log(findPizza.count);
        state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload.finder);
        console.log(action.payload.finder);
        console.log(findPizza.count);
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
    removePizza: (state, action) => {
      state.pizzas = state.pizzas.filter((obj) => obj.finder !== action.payload.finder);
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
