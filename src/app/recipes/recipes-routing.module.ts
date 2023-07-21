import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes-revolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoutes: Routes = [
    { 
        path: 'recipes', 
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        { 
            path: ':id', 
            component: RecipeDetailComponent, 
            resolve: [RecipeResolverService]
        },
        { 
            path: ':id/edit', 
            component: RecipeEditComponent,
            resolve: [RecipeResolverService]
        }
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {

}