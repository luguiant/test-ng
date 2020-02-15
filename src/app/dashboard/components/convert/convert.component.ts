import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { FacadeService } from "src/app/core/services/facade/facade.service";
import { Subscription } from "rxjs";
import { ListCurrency } from "src/app/core/interface/list-currency";
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-convert",
  templateUrl: "./convert.component.html",
  styleUrls: ["./convert.component.scss"]
})
export class ConvertComponent implements OnInit, AfterViewInit, OnDestroy {
  public $suscribeList: Subscription;
  public $suscribeConvert: Subscription;
  public listCurrency: ListCurrency[];
  public resultData: any;

  public form: FormGroup = new FormGroup({
    from: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9]{3,10}$')]),
    qty: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]{3,10}$')])
  });

  public constructor(
    protected facade: FacadeService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.$suscribeList = this.facade.coinService.getMyCoins().subscribe(
      result => {
        if (result && result.data) {
          this.listCurrency = result.data;
        }
      },
      error => {
        this.openSnackBar(error.error.message);
      }
    );
  }

  public submit(): void{
    if(this.form.valid){
      const from: string = this.form.value.from;
      const qty: number = this.form.value.qty;
      this.$suscribeConvert=this.facade.coinService.converService(from,qty).subscribe(
        result => {
          this.resultData = result.data;
        },
        error=>{
          this.openSnackBar(error.error.message);
        }
      );
    }
  }

  public ngOnDestroy(): void {
    if(this.$suscribeList){
      this.$suscribeList.unsubscribe();
    }
    if(this.$suscribeConvert){
      this.$suscribeList.unsubscribe();
    }
  }

  private openSnackBar(message: string): any {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "top"
    });
  }
}
