import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCurrencyComponent } from './top-currency.component';

describe('TopCurrencyComponent', () => {
  let component: TopCurrencyComponent;
  let fixture: ComponentFixture<TopCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
