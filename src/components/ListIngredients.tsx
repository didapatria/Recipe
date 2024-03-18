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
    <div className='w-1/2 h-full overflow-y-auto'>
      <ul>
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
    </div>
  );
};

export default ListIngredients;