import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteFirmComponent } from './compte-firm.component';

describe('CompteFirmComponent', () => {
  let component: CompteFirmComponent;
  let fixture: ComponentFixture<CompteFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
