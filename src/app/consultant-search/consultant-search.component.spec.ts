import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSearchComponent } from './consultant-search.component';

describe('ConsultantSearchComponent', () => {
  let component: ConsultantSearchComponent;
  let fixture: ComponentFixture<ConsultantSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
