import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusstopUpdateComponent } from './busstop-update.component';

describe('BusstopUpdateComponent', () => {
  let component: BusstopUpdateComponent;
  let fixture: ComponentFixture<BusstopUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusstopUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusstopUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
