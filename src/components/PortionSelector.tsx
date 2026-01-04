import { Minus, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortionSelectorProps {
  portions: number;
  onChange: (portions: number) => void;
}

export function PortionSelector({ portions, onChange }: PortionSelectorProps) {
  const decrease = () => {
    if (portions > 1) onChange(portions - 1);
  };

  const increase = () => {
    if (portions < 8) onChange(portions + 1);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">Servings</p>
          <p className="text-sm text-muted-foreground">How many people?</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={decrease}
          disabled={portions <= 1}
          className="h-9 w-9 rounded-full border-border"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center text-xl font-semibold text-foreground">
          {portions}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={increase}
          disabled={portions >= 8}
          className="h-9 w-9 rounded-full border-border"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
