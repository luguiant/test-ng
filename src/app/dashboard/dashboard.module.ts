import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./components/main/main.component";
import { AddMoneyComponent } from "./components/add-money/add-money.component";
import { ConvertComponent } from "./components/convert/convert.component";
import { TopCurrencyComponent } from "./components/top-currency/top-currency.component";
import { ListCurrencyComponent } from "./components/list-currency/list-currency.component";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard.routing";
import {
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSelectModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MainComponent,
    AddMoneyComponent,
    ConvertComponent,
    TopCurrencyComponent,
    ListCurrencyComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
  ]
})
export class DashboardModule {}
