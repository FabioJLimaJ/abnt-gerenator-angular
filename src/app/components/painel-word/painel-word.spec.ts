import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelWord } from './painel-word';

describe('PainelWord', () => {
  let component: PainelWord;
  let fixture: ComponentFixture<PainelWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelWord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelWord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
