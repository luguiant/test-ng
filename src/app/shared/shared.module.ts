import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatNavList } from '@angular/material';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { ValidationDirective } from './directives/validation/validation.directive';

@NgModule({
  imports: [
      CommonModule,
      MatSidenavModule,
      MatButtonModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule,
      RouterModule
    ],
  declarations: [
      SideBarComponent,
      ValidationDirective
  ],
  exports: [
    SideBarComponent,
    ValidationDirective
  ],
})
export class SharedModule {}