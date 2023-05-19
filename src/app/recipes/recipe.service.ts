import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger',
            'A super tasty burger.',
            'https://www.alemeksyk.eu/images/blog/tully_and_burger/TB_Marriott-2.jpg',
            [
                new Ingredient('Burger meat', 1),
                new Ingredient('Buns', 2),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Chili con carne',
            'Delicious chili!',
            'https://live.staticflickr.com/2547/3862672238_30d378e7d6.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Bean', 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService)  {}

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes.slice()[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }
}