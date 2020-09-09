import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: 'main',
        loadChildren: () => import('./menu/main/main.module').then( m => m.MainPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/main',
    pathMatch: 'full'
  },
  {
    path: 'free',
    children:[
      {
        path: 'groups',
        loadChildren: () => import('./mode/free/groups/groups.module').then( m => m.GroupsPageModule)
      },
      {
        path: 'cards/:idGroup',
        loadChildren: () => import('./mode/free/cards/cards.module').then( m => m.CardsPageModule)
      },
      {
        path: 'detail/:idCard',
        loadChildren: () => import('./mode/free/detail/detail.module').then( m => m.DetailPageModule)
      }
    ]
    
},
  {
    path: 'create-character',
    loadChildren: () => import('./mode/role-play/create-character/create-character.module').then( m => m.CreateCharacterPageModule)
  }
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
