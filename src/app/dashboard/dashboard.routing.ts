import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { ListCurrencyComponent } from './components/list-currency/list-currency.component';
import { ConvertComponent } from './components/convert/convert.component';
import { AddMoneyComponent } from './components/add-money/add-money.component';
import { TopCurrencyComponent } from './components/top-currency/top-currency.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
        {
            path: '',
            component: ListCurrencyComponent,
        },
        {
            path: 'conver',
            component: ConvertComponent,
        },
        {
            path: 'add-currency',
            component: AddMoneyComponent,
        },
        {
            path: 'top-currency',
            component: TopCurrencyComponent,
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
