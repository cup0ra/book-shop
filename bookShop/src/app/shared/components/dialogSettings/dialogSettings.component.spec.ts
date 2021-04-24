import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettingsComponent } from './dialogSettings.component';

describe('DialogComponent', () => {
  let component: DialogSettingsComponent;
  let fixture: ComponentFixture<DialogSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
