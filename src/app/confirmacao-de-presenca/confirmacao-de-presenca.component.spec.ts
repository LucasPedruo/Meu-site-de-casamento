import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoDePresencaComponent } from './confirmacao-de-presenca.component';

describe('ConfirmacaoDePresencaComponent', () => {
  let component: ConfirmacaoDePresencaComponent;
  let fixture: ComponentFixture<ConfirmacaoDePresencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoDePresencaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoDePresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
