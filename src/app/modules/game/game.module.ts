import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { GameRoutingModule } from "./game-routing.module";
import { GameHeaderComponent } from "./components/game-header/game-header.component";
import { CardComponent } from "./components/card/card.component";
import { GameComponent } from "./views/game/game.component";
import { PersonCardComponent } from "./components/person-card/person-card.component";
import { StarshipCardComponent } from "./components/starship-card/starship-card.component";
import { CardPropertyComponent } from "./components/card-property/card-property.component";

@NgModule({
  declarations: [
    GameHeaderComponent,
    CardComponent,
    PersonCardComponent,
    StarshipCardComponent,
    GameComponent,
    CardPropertyComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    GameRoutingModule
  ]
})
export default class GameModule { }