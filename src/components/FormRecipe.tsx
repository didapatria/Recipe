'use client'

import { nanoid } from '@reduxjs/toolkit';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import {
  addIngredient,
  nameIngredient,
  quantityIngredient,
  isDone,
  showButtonIngredient,
  showInputIngredient,
  removeIngredient,
} from '@/redux/slices/ingredientsSlice';
import {
  addStep,
  descriptionStep,
  showButtonStep,
  showInputStep,
  updateStep,
  removeStep,
} from '@/redux/slices/stepsSlice';
import { Ingredient, Step } from '@/redux/types';
import { FaPen, FaTrash } from "react-icons/fa6";

const FormRecipe = () => {
  const dispatch = useAppDispatch();
  const { ingredients, name, show, done, buttonIngredient, inputIngredient } = useAppSelector(
    (state: RootState) => state.ingredientsReducers
  );
  const { steps, description, buttonStep, inputStep } = useAppSelector(
    (state: RootState) => state.stepsReducers
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
      } else if (e.currentTarget.name === 'descriptionStep') {
        const id = nanoid();
        dispatch(addStep({ id, description: description }));
        dispatch(descriptionStep(''));
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

  const handleShowButton = (id: string) => {
    dispatch(showButtonIngredient({ id, buttonIngredient: !buttonIngredient[id] }));
  };

  const handleShowInput = (id: string) => {
    dispatch(showInputIngredient({ id, inputIngredient: !inputIngredient[id] }));
  };

  const handleUpdateIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      const name = e.target.value || '';
      const quantity = parseInt(e.target.value) || 0;
      // dispatch(updateIngredient({ id, name, quantity }));
    }
  };
  
  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const handleInputDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch(descriptionStep(e.target.value));
  };

  const handleUpdateStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      const description = e.target.value || '';
      // dispatch(updateStep({ id, description }));
    }
  };
  
  const handleRemoveStep = (id: string) => {
    // dispatch(removeStep(id));
  };
  
  return (
    <div className='w-1/2 h-screen bg-zinc-300 px-4 py-2 h-full space-y-4 overflow-y-auto'>
      <input
        type='text'
        name='ingredientName'
        value={name}
        onChange={handleInputNameChange}
        onKeyDown={handleKeyDown}
        className='w-full p-2 border-2 border-black rounded-md'
        placeholder='Nama Resep (input)'
      />
      <h2 className='text-md font-bold'>Bahan:</h2>
      {show && (
        <ul className='space-y-2'>
          {ingredients.map((ingredient: Ingredient) => (
            <li
              key={ingredient.id}
              className={show[ingredient.id] ? 'block' : 'hidden'}
            >
              {ingredient.quantity !== 0 && done[ingredient.id] ? (
                <div className='flex justify-between items-center'>
                  <ul 
                    onClick={() =>
                      handleShowButton(ingredient.id)
                    }
                    className='flex items-center space-x-4'
                  >
                    <li>
                      {ingredient.quantity}
                    </li>
                    <li>
                      {ingredient.name}
                    </li>
                  </ul>
                  {buttonIngredient[ingredient.id] && 
                    <ul className='flex justify-center items-center space-x-4'>
                      <li>
                        <button
                          type="button"
                          onClick={() =>
                            handleShowInput(ingredient.id)
                          }
                          // onClick={() =>
                          //   handleUpdateIngredient(ingredient.id)
                          // }
                          className='flex justify-center items-center p-1 w-7 h-7 bg-transparent text-black rounded-full'
                        >
                          <FaPen />
                        </button>
                      </li>
                      <li>
                      <button
                          type="button"
                          onClick={() =>
                            handleRemoveIngredient(ingredient.id)
                          }
                          className='flex justify-center items-center p-1 w-7 h-7 bg-black text-white rounded-full'
                        >
                          <FaTrash />
                        </button>
                      </li>
                    </ul>
                  }
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
                  <div>
                    {ingredient.name}
                  </div>
                </div>
              )}
              {inputIngredient[ingredient.id] && 
                  <div className='flex space-x-4'>
                    <input
                      type='number'
                      name='ingredientQuantity'
                      data-id={ingredient.id}
                      // value={ingredient.quantity}
                      onChange={handleInputQuantityChange}
                      className='w-full p-2 border-2 border-black rounded-md'
                      placeholder='Jumlah'
                    />
                    <input
                      type='text'
                      name='ingredientName'
                      data-id={ingredient.id}
                      // value={ingredient.name}
                      onChange={handleUpdateIngredient}
                      onKeyDown={handleKeyDown}
                      className='w-full p-2 border-2 border-black rounded-md'
                      placeholder='Bahan'
                    />
                  </div>
                }
            </li>
          ))}
        </ul>
      )}
      <h2 className='text-md font-bold'>Tata Cara</h2>
      <input
        type='text'
        name='descriptionStep'
        value={description}
        onChange={handleInputDescriptionChange}
        onKeyDown={handleKeyDown}
        className='w-full p-2 border-2 border-black rounded-md'
        placeholder='(input)'
      />
      <ul className='space-y-2'>
          {steps.map((step: Step, index: number) => (
            <li key={step.id}>
              {index + 1}. {step.description}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default FormRecipe;