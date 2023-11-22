import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'battlefield',
    loadChildren: () => import('./modules/game/game.module')
  },
  {
    path: 'stats',
    loadChildren: () => import('./modules/stats/stats.module')
  },
  {
    path: '**', redirectTo: 'battlefield', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
