import { useState, useCallback, useEffect } from 'react';
import { Recipe } from '@/types/recipe';

const FAVORITES_KEY = 'recipe-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((recipeId: string) => {
    return favorites.some(f => f.id === recipeId);
  }, [favorites]);

  const toggleFavorite = useCallback((recipe: Recipe) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === recipe.id);
      if (exists) {
        return prev.filter(f => f.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId: string) => {
    setFavorites(prev => prev.filter(f => f.id !== recipeId));
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite
  };
}
