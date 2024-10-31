import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCurrentStatusComponent } from './art-current-status.component';

describe('ArtCurrentStatusComponent', () => {
  let component: ArtCurrentStatusComponent;
  let fixture: ComponentFixture<ArtCurrentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtCurrentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtCurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
