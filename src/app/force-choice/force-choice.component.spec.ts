import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceChoiceComponent } from './force-choice.component';

describe('ForceChoiceComponent', () => {
  let component: ForceChoiceComponent;
  let fixture: ComponentFixture<ForceChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
