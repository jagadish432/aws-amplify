import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  {path: 'posts', component: PostsComponent},
  {path: '**', component: RestaurantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
