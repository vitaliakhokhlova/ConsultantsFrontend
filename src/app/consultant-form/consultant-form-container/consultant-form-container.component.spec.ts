import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantFormContainerComponent } from './consultant-form-container.component';

describe('ConsultantFormContainerComponent', () => {
  let component: ConsultantFormContainerComponent;
  let fixture: ComponentFixture<ConsultantFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
