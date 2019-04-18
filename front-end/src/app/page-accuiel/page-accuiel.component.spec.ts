import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccuielComponent } from './page-accuiel.component';

describe('PageAccuielComponent', () => {
  let component: PageAccuielComponent;
  let fixture: ComponentFixture<PageAccuielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAccuielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccuielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
