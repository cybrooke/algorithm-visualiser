import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFinderVisualiserComponent } from './path-finder-visualiser.component';

describe('PathFinderVisualiserComponent', () => {
  let component: PathFinderVisualiserComponent;
  let fixture: ComponentFixture<PathFinderVisualiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathFinderVisualiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFinderVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
