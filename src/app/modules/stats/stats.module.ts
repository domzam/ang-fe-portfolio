import { NgModule } from "@angular/core";
import { StatsComponent } from "./views/stats/stats.component";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { StatsRoutingModule } from "./stats-routing.module";

@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    StatsRoutingModule
  ]
})
export default class StatsModule { }