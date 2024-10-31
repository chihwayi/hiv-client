import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtInitiationDemographicsComponent } from './art-initiation-demographics.component';

describe('ArtInitiationDemographicsComponent', () => {
  let component: ArtInitiationDemographicsComponent;
  let fixture: ComponentFixture<ArtInitiationDemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtInitiationDemographicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtInitiationDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
