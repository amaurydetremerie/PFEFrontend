import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceSignaleComponent } from './annonce-signale.component';

describe('AnnonceSignaleComponent', () => {
  let component: AnnonceSignaleComponent;
  let fixture: ComponentFixture<AnnonceSignaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceSignaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceSignaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
