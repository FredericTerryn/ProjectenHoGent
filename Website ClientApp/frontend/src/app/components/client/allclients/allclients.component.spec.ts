import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllclientsComponent } from './allclients.component';

describe('AllclientsComponent', () => {
  let component: AllclientsComponent;
  let fixture: ComponentFixture<AllclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
