import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SingleOfferMemberComponent} from './single-offer-member.component';

describe('SingleOfferMemberComponent', () => {
  let component: SingleOfferMemberComponent;
  let fixture: ComponentFixture<SingleOfferMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleOfferMemberComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOfferMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
