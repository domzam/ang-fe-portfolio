import { NgModule } from "@angular/core";
import { GameCardComponent } from "./components/game-card/game-card.component";
import { BattlefieldComponent } from "./views/battlefield/battlefield.component";
import { StarshipCardComponent } from "./components/starship-card/starship-card.component";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { GameRoutingModule } from "./game-routing.module";
import { BattlefieldHeaderComponent } from "./components/battlefield-header/battlefield-header.component";

@NgModule({
  declarations: [
    GameCardComponent,
    StarshipCardComponent,
    BattlefieldComponent,
    BattlefieldHeaderComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    GameRoutingModule
  ]
})
export default class GameModule { }