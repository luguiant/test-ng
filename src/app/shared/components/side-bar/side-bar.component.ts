import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor() {
   }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnInit() {
  }

}
