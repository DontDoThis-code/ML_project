import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSelectorComponent } from './setting-selector.component';

describe('SettingSelectorComponent', () => {
  let component: SettingSelectorComponent;
  let fixture: ComponentFixture<SettingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
