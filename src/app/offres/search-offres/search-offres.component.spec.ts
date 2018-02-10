import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOffresComponent } from './search-offres.component';

describe('SearchOffresComponent', () => {
  let component: SearchOffresComponent;
  let fixture: ComponentFixture<SearchOffresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOffresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
