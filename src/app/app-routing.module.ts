import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ultima',
    loadChildren: () => import('./ultima/ultima.module').then( m => m.UltimaPageModule)
  },
  {
    path: 'nacionales',
    loadChildren: () => import('./nacionales/nacionales.module').then( m => m.NacionalesPageModule)
  },
  {
    path: 'internacionales',
    loadChildren: () => import('./internacionales/internacionales.module').then( m => m.InternacionalesPageModule)
  },
  {
    path: 'deportes',
    loadChildren: () => import('./deportes/deportes.module').then( m => m.DeportesPageModule)
  },
  {
    path: 'farandula',
    loadChildren: () => import('./farandula/farandula.module').then( m => m.FarandulaPageModule)
  },
  {
    path: 'tendencias',
    loadChildren: () => import('./tendencias/tendencias.module').then( m => m.TendenciasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
