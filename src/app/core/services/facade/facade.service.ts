import { Injectable, Injector } from '@angular/core';
import { UserService } from '../user/user.service';
import { CoinService } from '../coin/coin.service';
import { BraveService } from '../brave/brave.service';

@Injectable()
export class FacadeService {
 
  // Private properties 
  private _userService: UserService;
  private _coinService: CoinService;
  private _braveService: BraveService;

  // Gets
  public get userService(): UserService {
    if(!this._userService){
      this._userService = this.injector.get(UserService);
    }
    return this._userService;
  }

  public get coinService(): CoinService {
    if(!this._coinService){
      this._coinService = this.injector.get(CoinService);
    }
    return this._coinService;
  }

  public get braveService(): BraveService{
    if(!this._braveService){
      this._braveService = this.injector.get(BraveService);
    }
    return this._braveService;
  }

  public constructor(
    private injector: Injector
  ) { }
}
