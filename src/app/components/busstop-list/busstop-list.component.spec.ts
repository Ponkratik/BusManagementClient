import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusstopListComponent } from './busstop-list.component';

describe('BusstopListComponent', () => {
  let component: BusstopListComponent;
  let fixture: ComponentFixture<BusstopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusstopListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusstopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
