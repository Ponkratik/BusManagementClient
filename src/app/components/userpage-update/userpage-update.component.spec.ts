import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpageUpdateComponent } from './userpage-update.component';

describe('UserpageUpdateComponent', () => {
  let component: UserpageUpdateComponent;
  let fixture: ComponentFixture<UserpageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
