export interface Ingredient {
  name: string;
  quantity: string;
  substitution: string | null;
}

export interface MissingIngredient {
  name: string;
  suggested_substitution: string;
}

export interface Nutrition {
  calories_per_serving: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface Recipe {
  id: string;
  title: string;
  prep_time_minutes: number;
  servings: number;
  ingredients: Ingredient[];
  missing_ingredients: MissingIngredient[];
  instructions: string[];
  nutrition: Nutrition;
  image_url?: string;
}

export interface DietaryPreferences {
  gluten_free: boolean;
  halal: boolean;
  kosher: boolean;
  vegan: boolean;
  vegetarian: boolean;
  dairy_free: boolean;
  nut_free: boolean;
}

export interface RecipeRequest {
  ingredients_available: string[];
  dietary_constraints: DietaryPreferences;
  portion_size: number;
  max_recipes: number;
  allow_substitutions: boolean;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
}
