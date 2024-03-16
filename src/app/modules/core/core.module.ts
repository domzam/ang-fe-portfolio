import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }