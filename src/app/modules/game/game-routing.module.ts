import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BattlefieldComponent } from "./views/battlefield/battlefield.component";
import { gameInProgressGuard } from "../core/guards/game-in-progress.guard";
import { NgxsModule } from "@ngxs/store";
import { GameState } from "./state/game.state";

const routes: Routes = [
  {
    path: '',
    component: BattlefieldComponent,
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
