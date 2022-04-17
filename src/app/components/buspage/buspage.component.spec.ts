import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspageComponent } from './buspage.component';

describe('BuspageComponent', () => {
  let component: BuspageComponent;
  let fixture: ComponentFixture<BuspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
