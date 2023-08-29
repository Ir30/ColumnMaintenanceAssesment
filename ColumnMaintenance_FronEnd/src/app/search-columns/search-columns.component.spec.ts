import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColumnsComponent } from './search-columns.component';

describe('SearchColumnsComponent', () => {
  let component: SearchColumnsComponent;
  let fixture: ComponentFixture<SearchColumnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchColumnsComponent]
    });
    fixture = TestBed.createComponent(SearchColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
