import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadPlaceholderComponent } from './ciudad-placeholder.component';

describe('CiudadPlaceholderComponent', () => {
  let component: CiudadPlaceholderComponent;
  let fixture: ComponentFixture<CiudadPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiudadPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
