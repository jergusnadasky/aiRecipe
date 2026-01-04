import { Clock, Flame, Heart, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index: number;
}

export function RecipeCard({ recipe, onClick, isFavorite, onToggleFavorite, index }: RecipeCardProps) {
  return (
    <article
      className="recipe-card animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image placeholder with gradient */}
      <div 
        className="relative h-40 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40 overflow-hidden"
        onClick={onClick}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="w-12 h-12 text-primary/40" />
        </div>
        
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm
                     flex items-center justify-center shadow-soft transition-transform hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            }`}
          />
        </button>

        {/* Missing ingredients badge */}
        {recipe.missing_ingredients.length > 0 && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-warning/90 backdrop-blur-sm
                        text-warning-foreground text-xs font-medium">
            +{recipe.missing_ingredients.length} ingredient{recipe.missing_ingredients.length > 1 ? 's' : ''} needed
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3" onClick={onClick}>
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2">
          {recipe.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {recipe.prep_time_minutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-primary" />
            {recipe.nutrition.calories_per_serving} cal
          </span>
        </div>

        {/* Macro badges */}
        <div className="flex gap-2">
          <span className="macro-badge bg-blue-100 text-blue-700">
            P: {recipe.nutrition.protein_g}g
          </span>
          <span className="macro-badge bg-amber-100 text-amber-700">
            C: {recipe.nutrition.carbs_g}g
          </span>
          <span className="macro-badge bg-rose-100 text-rose-700">
            F: {recipe.nutrition.fat_g}g
          </span>
        </div>
      </div>
    </article>
  );
}
