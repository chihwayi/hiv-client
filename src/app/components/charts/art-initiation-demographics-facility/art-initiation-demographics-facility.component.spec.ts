import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtInitiationDemographicsFacilityComponent } from './art-initiation-demographics-facility.component';

describe('ArtInitiationDemographicsFacilityComponent', () => {
  let component: ArtInitiationDemographicsFacilityComponent;
  let fixture: ComponentFixture<ArtInitiationDemographicsFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtInitiationDemographicsFacilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtInitiationDemographicsFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
