import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacadeService } from 'src/app/core/services/facade/facade.service';
import { Subscription } from 'rxjs';
import { TopListCurrency } from 'src/app/core/interface/top-list-currency';

@Component({
  selector: 'app-top-currency',
  templateUrl: './top-currency.component.html',
  styleUrls: ['./top-currency.component.scss']
})
export class TopCurrencyComponent implements OnInit, AfterViewInit {

  public $topSuscribe: Subscription;
  public top: TopListCurrency[];
  private displayedColumns: string[] = ['nombre', 'valor', 'fuente'];

  public constructor(protected facade: FacadeService) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void{
    this.$topSuscribe = this.facade.coinService.getMyTop('asc').subscribe(
      (result) => {
        if(result && result.data){
          this.top = result.data;
         }
         console.log(this.top);
      },
      (error) =>{

      }
    );
  }
}
