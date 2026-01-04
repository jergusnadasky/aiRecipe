import { useState, useCallback } from 'react';
import { Recipe, DietaryPreferences, RecipeRequest } from '@/types/recipe';

// Mock recipe generator - in production this would call the AI backend
function generateMockRecipes(request: RecipeRequest): Promise<Recipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipes: Recipe[] = [];
      const recipeTemplates = [
        {
          title: `Savory ${request.ingredients_available[0] || 'Protein'} Bowl`,
          prep: 25,
          instructions: [
            `Prepare and season ${request.ingredients_available[0] || 'your protein'} with salt and pepper.`,
            `Heat olive oil in a large pan over medium-high heat.`,
            `Cook until golden brown on all sides, about 6-8 minutes.`,
            `Add remaining ingredients and stir-fry for 5 minutes.`,
            `Season to taste and serve hot.`
          ]
        },
        {
          title: `Quick ${request.ingredients_available[1] || 'Veggie'} Stir-Fry`,
          prep: 20,
          instructions: [
            `Chop all vegetables into bite-sized pieces.`,
            `Heat a wok or large pan over high heat.`,
            `Add oil and stir-fry vegetables for 3-4 minutes.`,
            `Add sauce ingredients and toss to combine.`,
            `Serve immediately over rice or noodles.`
          ]
        },
        {
          title: `Healthy ${request.ingredients_available[2] || 'Garden'} Salad`,
          prep: 15,
          instructions: [
            `Wash and dry all greens thoroughly.`,
            `Prepare the dressing by whisking ingredients together.`,
            `Arrange vegetables in a large bowl.`,
            `Drizzle with dressing and toss gently.`,
            `Top with seeds or nuts and serve fresh.`
          ]
        },
        {
          title: `Comforting ${request.ingredients_available[0] || 'Home'} Soup`,
          prep: 35,
          instructions: [
            `Dice all vegetables into small, uniform pieces.`,
            `Sauté aromatics in a large pot until fragrant.`,
            `Add broth and bring to a simmer.`,
            `Add remaining ingredients and cook for 20 minutes.`,
            `Season to taste and serve with crusty bread.`
          ]
        },
        {
          title: `Crispy ${request.ingredients_available[1] || 'Veggie'} Bites`,
          prep: 30,
          instructions: [
            `Preheat oven to 400°F (200°C).`,
            `Mix ingredients with seasonings in a bowl.`,
            `Form into small patties or balls.`,
            `Arrange on a lined baking sheet.`,
            `Bake for 20-25 minutes until crispy and golden.`
          ]
        }
      ];

      for (let i = 0; i < Math.min(request.max_recipes, 5); i++) {
        const template = recipeTemplates[i % recipeTemplates.length];
        
        recipes.push({
          id: `recipe-${Date.now()}-${i}`,
          title: template.title,
          prep_time_minutes: template.prep,
          servings: request.portion_size,
          ingredients: request.ingredients_available.slice(0, 4).map((ing, idx) => ({
            name: ing,
            quantity: `${Math.floor(Math.random() * 300) + 100}g`,
            substitution: idx === 0 && request.dietary_constraints.vegan ? 'tofu' : null
          })),
          missing_ingredients: Math.random() > 0.5 ? [
            {
              name: ['soy sauce', 'sesame oil', 'ginger'][Math.floor(Math.random() * 3)],
              suggested_substitution: request.dietary_constraints.gluten_free ? 'tamari (gluten-free)' : 'coconut aminos'
            }
          ] : [],
          instructions: template.instructions,
          nutrition: {
            calories_per_serving: Math.floor(Math.random() * 300) + 300,
            protein_g: Math.floor(Math.random() * 25) + 15,
            carbs_g: Math.floor(Math.random() * 40) + 20,
            fat_g: Math.floor(Math.random() * 15) + 8
          }
        });
      }

      resolve(recipes);
    }, 2000); // Simulate API delay
  });
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipes = useCallback(async (
    ingredients: string[],
    dietary: DietaryPreferences,
    portions: number
  ) => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: RecipeRequest = {
        ingredients_available: ingredients,
        dietary_constraints: dietary,
        portion_size: portions,
        max_recipes: 5,
        allow_substitutions: true,
        skill_level: 'beginner'
      };

      const result = await generateMockRecipes(request);
      setRecipes(result);
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearRecipes = useCallback(() => {
    setRecipes([]);
    setError(null);
  }, []);

  return {
    recipes,
    isLoading,
    error,
    generateRecipes,
    clearRecipes
  };
}
