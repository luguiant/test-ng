import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade/facade.service';
import { Subscription } from 'rxjs';
import { ListCurrency } from '../../../core/interface/list-currency';
import { ResultListCurrency } from 'src/app/core/interface/result-list-currency';

@Component({
  selector: 'app-list-currency',
  templateUrl: './list-currency.component.html',
  styleUrls: ['./list-currency.component.scss']
})
export class ListCurrencyComponent implements OnInit, AfterViewInit {
  public $suscribeList: Subscription;
  public listCurrency: ListCurrency[];
  private displayedColumns: string[] = ['nombre', 'valor', 'fuente'];

  public constructor(protected facade: FacadeService) { }

  public ngOnInit(): void {
  }

  public trackByFn(index, item): string {
    return item.secret; // or item.id
  }

  public ngAfterViewInit(){
   this.$suscribeList = this.facade.coinService.getMyCoins().subscribe(
    (result) => {
      console.log(result);
       if(result && result.data){
        this.listCurrency = result.data;
       }
       console.log(this.listCurrency);
     }, 
     error => {

     }
   ); 
  }

}
