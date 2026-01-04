import { Switch } from '@/components/ui/switch';
import { DietaryPreferences as DietaryPreferencesType } from '@/types/recipe';
import { Wheat, Leaf, Fish, Milk, Cookie, Star, Circle } from 'lucide-react';

interface DietaryPreferencesProps {
  preferences: DietaryPreferencesType;
  onChange: (key: keyof DietaryPreferencesType, value: boolean) => void;
}

const DIETARY_OPTIONS: {
  key: keyof DietaryPreferencesType;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  { key: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="w-4 h-4" />, color: 'text-green-600' },
  { key: 'vegan', label: 'Vegan', icon: <Leaf className="w-4 h-4" />, color: 'text-emerald-600' },
  { key: 'gluten_free', label: 'Gluten-free', icon: <Wheat className="w-4 h-4" />, color: 'text-amber-600' },
  { key: 'dairy_free', label: 'Dairy-free', icon: <Milk className="w-4 h-4" />, color: 'text-blue-600' },
  { key: 'nut_free', label: 'Nut-free', icon: <Cookie className="w-4 h-4" />, color: 'text-orange-600' },
  { key: 'halal', label: 'Halal', icon: <Star className="w-4 h-4" />, color: 'text-teal-600' },
  { key: 'kosher', label: 'Kosher', icon: <Circle className="w-4 h-4" />, color: 'text-indigo-600' },
];

export function DietaryPreferences({ preferences, onChange }: DietaryPreferencesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {DIETARY_OPTIONS.map(({ key, label, icon, color }) => (
        <label
          key={key}
          className={`dietary-toggle group ${
            preferences[key] ? 'bg-accent border-primary/30' : ''
          }`}
        >
          <div className={`${color} ${preferences[key] ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
            {icon}
          </div>
          <span className="flex-1 text-sm font-medium">{label}</span>
          <Switch
            checked={preferences[key]}
            onCheckedChange={(checked) => onChange(key, checked)}
            className="data-[state=checked]:bg-primary"
          />
        </label>
      ))}
    </div>
  );
}
