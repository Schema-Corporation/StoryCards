import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './util/auth';

const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: 'main',
        loadChildren: () => import('./menu/main/main.module').then( m => m.MainPageModule),
        canActivate: [AuthService]
      },
      {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'free',
    children:[
      {
        path: 'groups',
        loadChildren: () => import('./mode/free/groups/groups.module').then( m => m.GroupsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'cards',
        loadChildren: () => import('./mode/free/cards/cards.module').then( m => m.CardsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'detail',
        loadChildren: () => import('./mode/free/detail/detail.module').then( m => m.DetailPageModule),
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: 'canvas',
    loadChildren: () => import('./mode/canvas/canvas.module').then( m => m.CanvasPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'canvas/add-canvas',
    loadChildren: () => import('./mode/canvas/add-canvas/add-canvas.module').then( m => m.AddCanvasPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'create-character',
    loadChildren: () => import('./mode/role-play/create-character/create-character.module').then( m => m.CreateCharacterPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }


  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
