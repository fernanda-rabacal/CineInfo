import { useContext } from 'react';
import { CineItemContext } from '../contexts/CineItemContext';

export function useCineItem() {
  return useContext(CineItemContext);
}
