import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacadeService } from 'src/app/core/services/facade/facade.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

interface coinFilter{
  code: string,
  name: string
}

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent implements OnInit, AfterViewInit {
  public objKey = Object.keys;

  public myControl = new FormControl();
  public form: FormGroup = new FormGroup({
    coin: new FormControl('',[Validators.required])
  });
  public options: any = [];
  public filteredOptions: Observable<coinFilter[]>;

  public constructor(
    protected facade: FacadeService,
    private _snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
         const filter = this._filter(value);
         if(filter.length === 1){
          this.form.get('coin').setValue(filter[0].code);
         } else {
          this.form.get('coin').setValue(null);
         }
         return filter;
      })
    );
  }

  private _filter(value: string): coinFilter[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public submit(): void {
    if(this.form.valid){
      this.facade.coinService.saveCoin(this.form.value.coin).subscribe(
        result => {
          this.openSnackBar('Moneda registrada con exito');
        }, error => {
          this.openSnackBar(error.error.data);
        }
      );
    }
  }

  private openSnackBar(message: string): any {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "top"
    });
  }

  public ngAfterViewInit(): void{
    this.facade.braveService.getAllDigitalCurrency().subscribe(
      result => {
       this.options = result.data;
      },
      error => {
        this.openSnackBar(error.error.message);
      }
    );
  }

}
