import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';
import { TeamBuilderViewComponent } from './components/team-builder-view/team-builder-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { TeamDisplayComponent } from './components/team-display/team-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ListViewComponent,
    DetailedViewComponent,
    TeamBuilderViewComponent,
    UserViewComponent,
    NavbarComponent,
    PokemonListComponent,
    TeamDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
