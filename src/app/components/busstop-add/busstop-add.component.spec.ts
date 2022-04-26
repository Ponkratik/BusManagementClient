import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusstopAddComponent } from './busstop-add.component';

describe('BusstopAddComponent', () => {
  let component: BusstopAddComponent;
  let fixture: ComponentFixture<BusstopAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusstopAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusstopAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
