import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ultima',
    pathMatch: 'full'
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
  },
  {
    
    path: 'new/:id',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'publicidad',
    loadChildren: () => import('./publicidad/publicidad.module').then( m => m.PublicidadPageModule)
  },  {
    path: 'baners',
    loadChildren: () => import('./baners/baners.module').then( m => m.BanersPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cupones',
    loadChildren: () => import('./cupones/cupones.module').then( m => m.CuponesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'paypal-mobile',
    loadChildren: () => import('./paypal-mobile/paypal-mobile.module').then( m => m.PaypalMobilePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
