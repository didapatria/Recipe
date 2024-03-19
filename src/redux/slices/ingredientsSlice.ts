import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Ingredient, IngredientState } from '@/redux/types';

const initialState: IngredientState = {
  ingredients: [],
  quantity: 0,
  name: '',
  show: {},
  done: {},
  buttonIngredient: {},
  inputIngredient: {},
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
    nameIngredient: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    showIngredient: (state, action: PayloadAction<{ id: string; show: boolean }>) => {
      const { id, show } = action.payload;
      state.show[id] = show;
    },
    quantityIngredient: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient.id === id);
      if (ingredientIndex !== -1) {
        state.ingredients[ingredientIndex].quantity = quantity;
      }
    },
    isDone: (state, action: PayloadAction<{ id: string; done: boolean }>) => {
      const { id, done } = action.payload;
      state.done[id] = done;
    },
    showButtonIngredient: (state, action: PayloadAction<{ id: string; buttonIngredient: boolean }>) => {
      const { id, buttonIngredient } = action.payload;
      state.buttonIngredient[id] = buttonIngredient;
    },
    showInputIngredient: (state, action: PayloadAction<{ id: string; inputIngredient: boolean }>) => {
      const { id, inputIngredient } = action.payload;
      state.inputIngredient[id] = inputIngredient;
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
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
  },
});

export const {
    addIngredient,
    nameIngredient,
    showIngredient,
    quantityIngredient,
    isDone,
    showButtonIngredient,
    showInputIngredient,
    updateIngredient,
    removeIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;