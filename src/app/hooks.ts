import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed hooks for Redux.
 * 
 * These hooks are typed with our store's RootState and AppDispatch types,
 * so we get full TypeScript autocomplete and type safety when using them
 * in components. This is a common pattern to avoid importing the store
 * directly in every component.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
