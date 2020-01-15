import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingVisualiserComponent } from './sorting-visualiser.component';

describe('SortingVisualiserComponent', () => {
  let component: SortingVisualiserComponent;
  let fixture: ComponentFixture<SortingVisualiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingVisualiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
