import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { WorkCategoryComponent } from './components/work-category/work-category.component';
import { WorksListComponent } from './components/works-list/works-list.component';
import { ImgZoomComponent } from './components/img-zoom/img-zoom.component';
import { ArtWorkViewComponent } from './components/art-work-view/art-work-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'works', component: ArtWorkViewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'workstest', component: WorksListComponent },
  { path: 'works/:permalink', component: ArtWorkViewComponent },
  { path: 'works/:permalink/:albumId/:imgId', component: ImgZoomComponent },
  { path: 'works/category/:category', component: WorkCategoryComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
