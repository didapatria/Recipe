import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducers from '@/redux/slices/ingredientsSlice';
import stepsReducers from '@/redux/slices/stepsSlice';


export const store = configureStore({
  reducer: {
    ingredientsReducers,
    stepsReducers,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;