import { Component } from "@angular/core";
import { DataStroageService } from "../shared/data-storage.service";

@Component(
  {
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
export class HeaderComponent {
  collapsed = true;

  constructor(private dataStorageService: DataStroageService) {}

  onSaveData() {
   this.dataStorageService.storeRecipes(); 
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
