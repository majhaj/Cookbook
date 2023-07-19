import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStroageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component(
  {
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStroageService,
              private authService: AuthService) {}
  
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //!user ? false : true; or this version
    });
  }

  onSaveData() {
   this.dataStorageService.storeRecipes(); 
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();;
  }
}
