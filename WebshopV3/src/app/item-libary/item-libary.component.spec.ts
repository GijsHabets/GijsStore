import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLibaryComponent } from './item-libary.component';

describe('ItemLibaryComponent', () => {
  let component: ItemLibaryComponent;
  let fixture: ComponentFixture<ItemLibaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLibaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemLibaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
