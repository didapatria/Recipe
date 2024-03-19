'use client'

import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import {
  showIngredient,
} from '@/redux/slices/ingredientsSlice';
import { Ingredient } from '@/redux/types';

const ListIngredients = () => {
  const dispatch = useAppDispatch();
  const { ingredients, show } = useAppSelector(
    (state : RootState) => state.ingredientsReducers
  );

  const handleShowIngredient = (id: string) => {
    dispatch(showIngredient({ id, show: !show[id] }));
  };

  return (
    <div className='w-1/2 h-screen bg-zinc-300 px-4 py-6 h-full text-center space-y-20 overflow-y-auto'>
      <ul className='space-y-2'>
        {ingredients.map((ingredient: Ingredient) => (
          <li
            key={ingredient.id}
            onClick={() =>
              handleShowIngredient(ingredient.id)
            }
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
      <div>(List bahan-bahan)</div>
    </div>
  );
};

export default ListIngredients;