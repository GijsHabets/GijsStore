import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMiniComponent } from './remove-mini.component';

describe('RemoveMiniComponent', () => {
  let component: RemoveMiniComponent;
  let fixture: ComponentFixture<RemoveMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveMiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
