import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOffresComponent } from './gestion-offres.component';

describe('GestionOffresComponent', () => {
  let component: GestionOffresComponent;
  let fixture: ComponentFixture<GestionOffresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionOffresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
