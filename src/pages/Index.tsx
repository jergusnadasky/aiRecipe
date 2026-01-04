import { useState } from 'react';
import { ChefHat, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IngredientInput } from '@/components/IngredientInput';
import { DietaryPreferences } from '@/components/DietaryPreferences';
import { PortionSelector } from '@/components/PortionSelector';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetail } from '@/components/RecipeDetail';
import { LoadingState } from '@/components/LoadingState';
import { useRecipes } from '@/hooks/useRecipes';
import { useFavorites } from '@/hooks/useFavorites';
import { DietaryPreferences as DietaryPreferencesType, Recipe } from '@/types/recipe';

export default function Index() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<DietaryPreferencesType>({
    gluten_free: false,
    halal: false,
    kosher: false,
    vegan: false,
    vegetarian: false,
    dairy_free: false,
    nut_free: false,
  });
  const [portions, setPortions] = useState(2);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);

  const { recipes, isLoading, error, generateRecipes, clearRecipes } = useRecipes();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.some(i => i.toLowerCase() === ingredient.toLowerCase())) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleDietaryChange = (key: keyof DietaryPreferencesType, value: boolean) => {
    setDietary({ ...dietary, [key]: value });
  };

  const handleGenerate = () => {
    generateRecipes(ingredients, dietary, portions);
  };

  const handleBack = () => {
    if (selectedRecipe) {
      setSelectedRecipe(null);
    } else {
      clearRecipes();
    }
  };

  // Show recipe detail
  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        isFavorite={isFavorite(selectedRecipe.id)}
        onToggleFavorite={() => toggleFavorite(selectedRecipe)}
      />
    );
  }

  // Show recipe results
  if (recipes.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container max-w-2xl py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to ingredients
              </button>
              <span className="text-sm text-muted-foreground">
                {recipes.length} recipes found
              </span>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="container max-w-2xl px-4 py-6">
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">
            Your Recipes
          </h1>
          
          <div className="grid gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onClick={() => setSelectedRecipe(recipe)}
                isFavorite={isFavorite(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  // Main input view
  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background pb-8 pt-12">
        <div className="container max-w-2xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                AI Recipe Chef
              </h1>
              <p className="text-sm text-muted-foreground">
                Turn your ingredients into delicious meals
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
      </header>

      {/* Main content */}
      <main className="container max-w-2xl px-4 py-6 space-y-8">
        {/* Ingredient input section */}
        <section className="space-y-4 animate-fade-up">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">What's in your kitchen?</h2>
          </div>
          <IngredientInput
            ingredients={ingredients}
            onAdd={handleAddIngredient}
            onRemove={handleRemoveIngredient}
          />
        </section>

        {/* Portion selector */}
        <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <PortionSelector
            portions={portions}
            onChange={setPortions}
          />
        </section>

        {/* Dietary preferences (collapsible) */}
        <section className="space-y-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Dietary preferences</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {showPreferences ? 'Hide' : 'Show'}
            </span>
          </button>
          
          {showPreferences && (
            <div className="animate-fade-up">
              <DietaryPreferences
                preferences={dietary}
                onChange={handleDietaryChange}
              />
            </div>
          )}
        </section>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Generate button */}
        <section className="pt-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Button
            onClick={handleGenerate}
            disabled={ingredients.length === 0}
            className="w-full h-14 text-base font-semibold rounded-xl bg-primary text-primary-foreground
                     hover:bg-primary/90 btn-primary-glow disabled:opacity-50 disabled:shadow-none"
          >
            <span>Generate Recipes</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {ingredients.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Add at least one ingredient to get started
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
