import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './util/auth';

const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: 'main',
        loadChildren: () => import('./menu/main/main.module').then(m => m.MainPageModule),
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
    children: [
      {
        path: 'groups',
        loadChildren: () => import('./mode/free/groups/groups.module').then(m => m.GroupsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'cards',
        loadChildren: () => import('./mode/free/cards/cards.module').then(m => m.CardsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'detail',
        loadChildren: () => import('./mode/free/detail/detail.module').then(m => m.DetailPageModule),
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: 'canvas',
    children: [
      {
        path: 'canvas',
        loadChildren: () => import('./mode/canvas/canvas/canvas.module').then(m => m.CanvasPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'add-canvas',
        loadChildren: () => import('./mode/canvas/add-canvas/add-canvas.module').then(m => m.AddCanvasPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'audience',
        loadChildren: () => import('./mode/canvas/type/audience/audience.module').then(m => m.AudiencePageModule),
        canActivate: [AuthService]
      },
      {
        path: 'structural-aspects',
        loadChildren: () => import('./mode/canvas/type/structural-aspects/structural-aspects.module').then(m => m.StructuralAspectsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'characters',
        loadChildren: () => import('./mode/canvas/type/characters/characters.module').then(m => m.CharactersPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'storytelling',
        loadChildren: () => import('./mode/canvas/type/storytelling/storytelling.module').then(m => m.StorytellingPageModule),
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: 'rooms',
    children: [
      {
        path: 'my-rooms',
        loadChildren: () => import('./mode/rooms/rooms/rooms.module').then(m => m.RoomsPageModule),
        canActivate: [AuthService]
      },
      {
        path: 'detail',
        loadChildren: () => import('./mode/rooms/detail/detail.module').then(m => m.DetailPageModule),
        canActivate: [AuthService]
      }
    ],
  },
  {
    path: 'waiting-guest',
    loadChildren: () => import('./mode/role-play/waiting-guest/waiting-guest.module').then( m => m.WaitingGuestPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'create-character',
    loadChildren: () => import('./mode/role-play/create-character/create-character.module').then(m => m.CreateCharacterPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'guest-turn',
    loadChildren: () => import('./mode/role-play/guest-turn/guest-turn.module').then( m => m.GuestTurnPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
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
  },
  {
    path: 'scores',
    loadChildren: () => import('./mode/role-play/scores/scores.module').then( m => m.ScoresPageModule)
  }






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
