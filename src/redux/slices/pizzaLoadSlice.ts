import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type PropsType = {
  categoryChosen: string;
  tagChosen: string;
  limit: number;
  page: number;
};

export const fetchItems = createAsyncThunk<PizzasType[], PropsType>(
  'pizzaLoad/fetchPizzas',
  async ({ categoryChosen, tagChosen, limit, page }) => {
    const response = await axios.get<PizzasType[]>(
      `https://6294b3e6a7203b3ed06f152c.mockapi.io/allPizzas?${categoryChosen}&${tagChosen}&limit=${limit}&page=${page}`,
    );
    return response.data;
  },
);

export const fetchAllItems = createAsyncThunk('pizzaLoad/fetchAllPizzas', async () => {
  const response = await axios.get<PizzasType[]>(
    `https://6294b3e6a7203b3ed06f152c.mockapi.io/allPizzas`,
  );
  return response.data as PizzasType[];
});

export const fetchById = createAsyncThunk<PizzaByIdType, string>(
  'pizzaLoad/fetchById',
  async (id) => {
    const response = await axios.get<PizzaByIdType>(
      `https://6294b3e6a7203b3ed06f152c.mockapi.io/items/${id}`,
    );
    return response.data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCSESS = 'sucsess',
  ERROR = 'error',
}

export type PizzaIngredientsType = {
  name: string;
  img: string;
};

export type ValueType = {
  weight: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

type PizzasType = {
  id: string;
  imageUrl: string;
  description: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number[];
  category: number[];
  rating: number;
};

export type PizzaByIdType = {
  id: string;
  imageUrl: string;
  description: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number[];
  category: number[];
  rating: number;
  ingredients: PizzaIngredientsType[];
  value: ValueType[];
};

interface PizzaLoadSliceTypes {
  status: Status;
  pageStatus: Status;
  pizzas: PizzasType[];
  allPizzas: PizzasType[];
  pizzaById: PizzaByIdType | [];
}

const initialState: PizzaLoadSliceTypes = {
  pizzaById: [],
  pizzas: [],
  allPizzas: [],
  status: Status.LOADING,
  pageStatus: Status.LOADING,
};

export const pizzaLoadSlice = createSlice({
  name: 'pizzaLoad',
  initialState,
  reducers: {
    clearArray: (state) => {
      state.pizzaById = [];
      state.pageStatus = Status.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = Status.SUCSESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      state.allPizzas = action.payload;
    });
    builder.addCase(fetchById.pending, (state) => {
      state.pizzaById = [];
      state.pageStatus = Status.LOADING;
    });
    builder.addCase(fetchById.fulfilled, (state, action) => {
      state.pizzaById = action.payload;
      state.pageStatus = Status.SUCSESS;
    });
    builder.addCase(fetchById.rejected, (state) => {
      state.pizzaById = [];
      state.pageStatus = Status.ERROR;
    });
  },
});

export const { clearArray } = pizzaLoadSlice.actions;

export default pizzaLoadSlice.reducer;
