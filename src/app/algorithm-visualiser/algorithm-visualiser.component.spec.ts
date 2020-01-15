import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmVisualiserComponent } from './algorithm-visualiser.component';

describe('AlgorithmVisualiserComponent', () => {
  let component: AlgorithmVisualiserComponent;
  let fixture: ComponentFixture<AlgorithmVisualiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmVisualiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
