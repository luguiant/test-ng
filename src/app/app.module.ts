import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageModule } from './page/page.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './core/handlers/auth-interceptor/auth-interceptor.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';
import { CommonModule } from '@angular/common';

const AUTH_INTERCEPTOR =  {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PageModule,
    DashboardModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AUTH_INTERCEPTOR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
