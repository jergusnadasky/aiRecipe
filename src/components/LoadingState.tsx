import { ChefHat, Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  "Consulting our AI chef...",
  "Finding the perfect recipes...",
  "Calculating nutrition facts...",
  "Checking dietary requirements...",
  "Almost ready to cook!",
];

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      {/* Animated chef icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 
                      flex items-center justify-center animate-pulse-soft">
          <ChefHat className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary 
                      flex items-center justify-center animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-lg font-medium text-foreground mb-2">
        Cooking up recipes for you
      </p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Our AI chef is analyzing your ingredients and creating personalized recipes...
      </p>

      {/* Shimmer loading bars */}
      <div className="mt-8 w-full max-w-xs space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-gradient-to-r from-muted via-muted-foreground/10 to-muted
                     bg-[length:200%_100%] animate-shimmer"
            style={{ 
              animationDelay: `${i * 200}ms`,
              width: `${100 - i * 15}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
}
