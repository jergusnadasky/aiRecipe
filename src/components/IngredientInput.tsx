import { useState, KeyboardEvent } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
}

const SUGGESTED_INGREDIENTS = [
  'Chicken breast', 'Rice', 'Eggs', 'Onion', 'Garlic', 
  'Tomatoes', 'Pasta', 'Olive oil', 'Bell pepper', 'Cheese'
];

export function IngredientInput({ ingredients, onAdd, onRemove }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const suggestions = SUGGESTED_INGREDIENTS.filter(
    s => !ingredients.some(i => i.toLowerCase() === s.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type an ingredient..."
            className="h-12 pl-4 pr-4 text-base bg-card border-border rounded-xl focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button 
          onClick={handleAddClick}
          disabled={!inputValue.trim()}
          className="h-12 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Ingredient chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={`${ingredient}-${index}`}
              className="ingredient-chip animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {ingredient}
              <button
                onClick={() => onRemove(ingredient)}
                className="ml-1 p-0.5 rounded-full hover:bg-secondary-foreground/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && ingredients.length < 10 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Quick add</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onAdd(suggestion)}
                className="px-3 py-1.5 text-sm rounded-full border border-dashed border-border
                         text-muted-foreground hover:text-foreground hover:border-primary/50
                         hover:bg-primary/5 transition-all duration-200"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
