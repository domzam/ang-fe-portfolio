import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { gameInProgressGuard } from "../core/guards/game-in-progress.guard";
import { GameState } from "./state/game.state";
import { GameComponent } from "./views/game/game.component";

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    canDeactivate: [gameInProgressGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgxsModule.forFeature([GameState])
  ],
  exports: [
    RouterModule,
    NgxsModule
  ]
})
export class GameRoutingModule { }
