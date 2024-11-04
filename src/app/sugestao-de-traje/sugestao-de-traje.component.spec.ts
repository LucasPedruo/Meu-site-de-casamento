import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestaoDeTrajeComponent } from './sugestao-de-traje.component';

describe('SugestaoDeTrajeComponent', () => {
  let component: SugestaoDeTrajeComponent;
  let fixture: ComponentFixture<SugestaoDeTrajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SugestaoDeTrajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugestaoDeTrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
