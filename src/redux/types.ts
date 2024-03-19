type Ingredient = {
  id: string;
  quantity: number;
  name: string;
};
type IngredientState = {
  ingredients: Ingredient[];
  quantity: number;
  name: string;
  show: {
    [id: string]: boolean;
  };
  done: {
    [id: string]: boolean;
  };
  button: boolean;
};
type Step = {
  id: string;
  description: string;
};
type StepState = {
  steps: Step[];
  button: boolean;
};

export type { Ingredient, IngredientState, Step, StepState };