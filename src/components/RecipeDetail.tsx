import { ArrowLeft, Clock, Users, Flame, Heart, AlertCircle, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function RecipeDetail({ recipe, onBack, isFavorite, onToggleFavorite }: RecipeDetailProps) {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-2xl py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="rounded-full"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl px-4 pt-6 space-y-6">
        {/* Hero section */}
        <div className="space-y-4 animate-fade-up">
          <div className="h-48 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40
                        flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-primary/40" />
          </div>
          
          <h1 className="font-display text-3xl font-bold text-foreground">
            {recipe.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <span className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              {recipe.prep_time_minutes} min
            </span>
            <span className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
              <Users className="w-4 h-4" />
              {recipe.servings} servings
            </span>
            <span className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
              <Flame className="w-4 h-4 text-primary" />
              {recipe.nutrition.calories_per_serving} cal/serving
            </span>
          </div>
        </div>

        {/* Nutrition breakdown */}
        <div className="grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="p-4 rounded-xl bg-blue-50 text-center">
            <p className="text-2xl font-bold text-blue-700">{recipe.nutrition.protein_g}g</p>
            <p className="text-sm text-blue-600">Protein</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 text-center">
            <p className="text-2xl font-bold text-amber-700">{recipe.nutrition.carbs_g}g</p>
            <p className="text-sm text-amber-600">Carbs</p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 text-center">
            <p className="text-2xl font-bold text-rose-700">{recipe.nutrition.fat_g}g</p>
            <p className="text-sm text-rose-600">Fat</p>
          </div>
        </div>

        {/* Missing ingredients warning */}
        {recipe.missing_ingredients.length > 0 && (
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 animate-fade-up" 
               style={{ animationDelay: '150ms' }}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">You might need</p>
                <ul className="mt-2 space-y-1">
                  {recipe.missing_ingredients.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{item.name}</span>
                      {item.suggested_substitution && (
                        <span> — or use <span className="text-primary">{item.suggested_substitution}</span></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <section className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <h2 className="section-title">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li 
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="flex-1">
                  <span className="font-medium">{ingredient.quantity}</span>{' '}
                  <span className="text-muted-foreground">{ingredient.name}</span>
                </span>
                {ingredient.substitution && (
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    or {ingredient.substitution}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="space-y-4 animate-fade-up" style={{ animationDelay: '250ms' }}>
          <h2 className="section-title">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground
                              flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="flex-1 pt-1 text-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
