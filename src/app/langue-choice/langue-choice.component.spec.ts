import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueChoiceComponent } from './langue-choice.component';

describe('LangueChoiceComponent', () => {
  let component: LangueChoiceComponent;
  let fixture: ComponentFixture<LangueChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangueChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangueChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
