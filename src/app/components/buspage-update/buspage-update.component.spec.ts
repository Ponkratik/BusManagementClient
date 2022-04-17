import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspageUpdateComponent } from './buspage-update.component';

describe('BuspageUpdateComponent', () => {
  let component: BuspageUpdateComponent;
  let fixture: ComponentFixture<BuspageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
