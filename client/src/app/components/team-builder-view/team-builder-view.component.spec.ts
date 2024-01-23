import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuilderViewComponent } from './team-builder-view.component';

describe('TeamBuilderViewComponent', () => {
  let component: TeamBuilderViewComponent;
  let fixture: ComponentFixture<TeamBuilderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBuilderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBuilderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
