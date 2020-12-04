import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent} from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home'} },
  { path: 'auth', component: AuthComponent, data: { animation: 'Auth'}, canActivate: [ AuthGuard ] },
  { path: 'main', component: MainComponent, data: { animation: 'Main'}, canActivate: [ AuthGuard ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
