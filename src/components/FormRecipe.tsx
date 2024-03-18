'use client'

import { nanoid } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import {
  addIngredient,
  updateIngredient,
  nameIngredient,
  quantityIngredient,
} from '@/redux/slices/ingredientsSlice';
import { Ingredient } from '@/redux/types';

const FormRecipe = () => {
  const dispatch = useAppDispatch();
  const { ingredients, name, quantity, show } = useAppSelector(
    (state: RootState) => state.ingredientsReducers
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const id = nanoid();
      dispatch(addIngredient({ id, quantity: 0, name: name }));
      dispatch(nameIngredient(''));
      // dispatch(quantityIngredient(0));
    }
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nameIngredient(e.target.value));
  };

  const handleInputQuantityChange = (id: string, quantity: number) => {
    dispatch(quantityIngredient({ id, quantity }));
  };
  
  return (
    <div className='w-1/2 h-full overflow-y-auto'>
      <input
        type='text'
        name='ingredientName'
        value={name}
        onChange={handleInputNameChange}
        onKeyDown={handleKeyDown}
        className='w-full p-2 border-2 border-black rounded-md'
        placeholder="Nama Resep (input)"
      />
      <h2>Bahan:</h2>
      {show && (
        <ul>
          {ingredients.map((ingredient: Ingredient) => (
            <li
              key={ingredient.id}
              // onClick={() =>
              //   dispatch()
              // }
              className={show[ingredient.id] ? 'block' : 'hidden'}
            >
              {ingredient.quantity !== 0 ? (
                <div className='flex items-center space-x-4'>
                  <p>
                    {ingredient.quantity}
                  </p>
                  <p>
                    {ingredient.name}
                  </p>
                </div>
              ) : (
                <div className='flex items-center space-x-4'>
                  <input
                    type='number'
                    value={quantity}
                    onChange={() => handleInputQuantityChange(ingredient.id, quantity)}
                    className='w-16 p-2 border-2 border-black rounded-md'
                  />
                  <p>
                    {ingredient.name}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormRecipe;