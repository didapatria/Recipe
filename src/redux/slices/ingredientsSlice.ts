import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Ingredient, IngredientState } from '@/redux/types';

const initialState: IngredientState = {
  ingredients: [],
  quantity: 0,
  name: '',
  show: {},
  button: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      const id = nanoid()
      state.ingredients.push({
        ...action.payload,
        id,
      });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
      delete state.show[action.payload];
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const { id, quantity, name } = action.payload;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (index !== -1) {
        state.ingredients[index].quantity = quantity;
        state.ingredients[index].name = name;
      }
    },
    nameIngredient: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    quantityIngredient: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const index = state.ingredients.findIndex(ingredient => ingredient.id === id);
      if (index !== -1) {
        state.ingredients[index].quantity = quantity;
      }
    },
    showIngredient: (state, action: PayloadAction<{ id: string; show: boolean }>) => {
      const { id, show } = action.payload;
      state.show[id] = show;
    },
  },
});

export const {
    addIngredient,
    removeIngredient,
    updateIngredient,
    nameIngredient,
    quantityIngredient,
    showIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;