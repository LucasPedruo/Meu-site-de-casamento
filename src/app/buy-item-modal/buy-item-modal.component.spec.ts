import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyItemModalComponent } from './buy-item-modal.component';

describe('BuyItemModalComponent', () => {
  let component: BuyItemModalComponent;
  let fixture: ComponentFixture<BuyItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyItemModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
