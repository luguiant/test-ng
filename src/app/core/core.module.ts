
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from './services/facade/facade.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { CoinService } from './services/coin/coin.service';
import { BraveService } from './services/brave/brave.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,   
  ],
  providers:[
    UserService,
    CoinService,
    BraveService,
    AuthGuard,
    FacadeService
  ],
  declarations: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}