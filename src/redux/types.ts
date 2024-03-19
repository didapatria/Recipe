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
  buttonIngredient: {
    [id: string]: boolean;
  };
  inputIngredient: {
    [id: string]: boolean;
  };
};
type Step = {
  id: string;
  description: string;
};
type StepState = {
  steps: Step[];
  description: string;
  buttonStep: {
    [id: string]: boolean;
  };
  inputStep: {
    [id: string]: boolean;
  };
};

export type { Ingredient, IngredientState, Step, StepState };