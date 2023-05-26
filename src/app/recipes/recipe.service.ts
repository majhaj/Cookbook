import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

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

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}