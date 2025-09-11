import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMiniComponent } from './update-mini.component';

describe('UpdateMiniComponent', () => {
  let component: UpdateMiniComponent;
  let fixture: ComponentFixture<UpdateMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
