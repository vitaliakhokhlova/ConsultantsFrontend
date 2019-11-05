import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceFormComponent } from './competence-form.component';

describe('CompetenceFormComponent', () => {
  let component: CompetenceFormComponent;
  let fixture: ComponentFixture<CompetenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
