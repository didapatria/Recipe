'use client'

import { nanoid } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import {
  addIngredient,
  nameIngredient,
  quantityIngredient,
  isDone,
} from '@/redux/slices/ingredientsSlice';
import { Ingredient } from '@/redux/types';

const FormRecipe = () => {
  const dispatch = useAppDispatch();
  const { ingredients, name, show, done } = useAppSelector(
    (state: RootState) => state.ingredientsReducers
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {    
    if (e.key === 'Enter') {
      if (e.currentTarget.name === 'ingredientName') {
        const id = nanoid();
        dispatch(addIngredient({ id, quantity: 0, name: name }));
        dispatch(nameIngredient(''));
      } else if (e.currentTarget.name === 'ingredientQuantity') {
        const id = e.currentTarget.dataset.id;
        if (id) {
          handleIsDone(id);
        } 
      }
    } else if (e.key === 'Escape') {
      dispatch(nameIngredient(''));
    }
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nameIngredient(e.target.value));
  };

  const handleInputQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      const quantity = parseInt(e.target.value) || 0;
      dispatch(quantityIngredient({ id, quantity }));
    }
  };

  const handleIsDone = (id: string) => {
    dispatch(isDone({ id, done: !done[id] }));
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
        placeholder='Nama Resep (input)'
      />
      <h2>Bahan:</h2>
      {show && (
        <ul className='space-y-2'>
          {ingredients.map((ingredient: Ingredient) => (
            <li
              key={ingredient.id}
              className={show[ingredient.id] ? 'block' : 'hidden'}
            >
              {ingredient.quantity !== 0 && done[ingredient.id] ? (
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
                    name='ingredientQuantity'
                    value={ingredient.quantity}
                    onChange={handleInputQuantityChange}
                    data-id={ingredient.id}
                    onKeyDown={handleKeyDown}
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