import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspageAddComponent } from './buspage-add.component';

describe('BuspageAddComponent', () => {
  let component: BuspageAddComponent;
  let fixture: ComponentFixture<BuspageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
