import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMiniComponent } from './add-mini.component';

describe('AddMiniComponent', () => {
  let component: AddMiniComponent;
  let fixture: ComponentFixture<AddMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
