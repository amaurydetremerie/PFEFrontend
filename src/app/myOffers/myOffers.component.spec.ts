import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersComponent } from './myOffers.component';

describe('MyOffersComponent', () => {
  let component: MyOffersComponent;
  let fixture: ComponentFixture<MyOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyOffersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
