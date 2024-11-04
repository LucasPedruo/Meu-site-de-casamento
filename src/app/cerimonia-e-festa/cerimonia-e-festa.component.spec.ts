import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerimoniaEFestaComponent } from './cerimonia-e-festa.component';

describe('CerimoniaEFestaComponent', () => {
  let component: CerimoniaEFestaComponent;
  let fixture: ComponentFixture<CerimoniaEFestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerimoniaEFestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerimoniaEFestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
