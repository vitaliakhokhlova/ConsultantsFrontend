import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceSearchComponent } from './competence-search.component';

describe('CompetenceSearchComponent', () => {
  let component: CompetenceSearchComponent;
  let fixture: ComponentFixture<CompetenceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
