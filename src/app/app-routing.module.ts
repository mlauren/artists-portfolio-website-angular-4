import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index/index.component';
import { AlbumComponent } from './components/album/album.component';
import { WorkComponent } from './components/work/work.component';
import { PageComponent } from './components/page/page.component';
import { StoreIndexComponent } from './components/store-index/store-index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'illustration/:imgId', component: IndexComponent },
  { path: 'works/:permalink', component: WorkComponent,
    children: [
      { path: ':albumId/:imgId', component: AlbumComponent },
      { path: ':albumId/', component: AlbumComponent },
    ]
  },
  { path: 'about', redirectTo: 'pages/about' },
  { path: 'pages/:permatwo', component: PageComponent},
  { path: 'store/', component: StoreIndexComponent },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
