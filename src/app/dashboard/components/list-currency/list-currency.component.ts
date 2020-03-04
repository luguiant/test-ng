import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { FacadeService } from '../../../core/services/facade/facade.service';
import { Subscription } from 'rxjs';
import { ListCurrency } from '../../../core/interface/list-currency';
import { ResultListCurrency } from 'src/app/core/interface/result-list-currency';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';
import { ThrowStmt } from '@angular/compiler';

interface responseCoin{
  coin: string
}

@Component({
  selector: 'app-list-currency',
  templateUrl: './list-currency.component.html',
  styleUrls: ['./list-currency.component.scss']
})
export class ListCurrencyComponent implements OnInit, AfterViewInit, AfterContentInit {
  public $suscribeList: Subscription;
  public $suscribeData: Subscription;
  public $suscribeConver: Subscription;
  public selected = new FormControl(0);
  public listCurrency: ListCurrency[];
  private displayedColumns: string[] = ['nombre', 'valor', 'fuente', 'convertir'];
  public dataUserParam: any;

  public $suscribeAuth: Subscription;
  public form: FormGroup = new FormGroup({
    qty: new FormControl('1',[Validators.required,Validators.pattern(/^[0-9]+$/)]),
    from: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    to: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    convert: new FormControl('')
  });

  public constructor(protected facade: FacadeService) { }

  public ngOnInit(): void {
    
  }

  public trackByFn(index, item): string {
    return item.secret; // or item.id
  }

  public ngAfterViewInit(){
    this.listCoin();
    this.dataUser();
    
  }

  public ngAfterContentInit(){
    setTimeout( ()=>{
      this.convertService();
    },2000);
  }

  public clickCode(code:string){
    this.selected.setValue(0);
    this.form.get('qty').setValue(1);
    this.form.get('from').setValue(code);
    this.form.get('to').setValue(this.dataUserParam);
    this.convertService();
  }

  public invert(){
    const to = this.form.value.to;
    const from = this.form.value.from;

    if(this.form.valid){
      this.form.get('to').setValue(from);
      this.form.get('from').setValue(to);
      this.convertService();
    }
  }

  public dataUser(){
    this.$suscribeData = this.facade.userService.dataUser().subscribe(
      (result) => {
        this.dataUserParam = result.coin;
        this.form.get('to').setValue(result.coin);
      }, error => {

      }
    );
  }

  public convertService() {
    const body = {
      qty: this.form.value.qty,
      to: this.form.value.to,
      from: this.form.value.from
    }
    console.log(this.form.value);
    this.$suscribeConver = this.facade.coinService.converList(body).subscribe(
      (response) =>{
        console.log(response);
        this.form.get('convert').setValue(response.data.to_quantity);
      }, error =>{

      }
    );
  }
  public listCoin(){
    this.$suscribeList = this.facade.coinService.getMyCoins().subscribe(
      (result) => {
        console.log(result);
         if(result && result.data){
          this.listCurrency = result.data;
          this.form.get('from').setValue(this.listCurrency[0].code_coin);
         }
         console.log(this.listCurrency);
       }, 
       error => {
  
       }
     ); 
  }

}
