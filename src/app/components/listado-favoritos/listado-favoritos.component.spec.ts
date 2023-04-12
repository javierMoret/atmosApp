import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFavoritosComponent } from './listado-favoritos.component';

describe('ListadoFavoritosComponent', () => {
  let component: ListadoFavoritosComponent;
  let fixture: ComponentFixture<ListadoFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFavoritosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
