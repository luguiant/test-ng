import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageRoutingModule } from "./page.routing";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthComponent } from "./auth/auth.component";
import {
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonModule
} from "@angular/material";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NotFoundComponent, AuthComponent],
  exports: [],
  providers: []
})
export class PageModule {}
