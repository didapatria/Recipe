import FormRecipeComponent from "@/components/FormRecipe";
import ListIngredientsComponent from "@/components/ListIngredients";

export default function Home() {
  return (
    <div className="flex">
      <ListIngredientsComponent />
      <FormRecipeComponent />
    </div>
  );
}