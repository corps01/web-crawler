import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'country-state-city';
import { IState } from 'country-state-city';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchTerm: any;
  selectedState: IState | null = null;
  states: IState[];

  @ViewChild(SearchResultsComponent)
  searchResultsComponent: SearchResultsComponent;

  ngOnInit(): void {
    this.getCountryStatesCities();
  }

  getCountryStatesCities(): void {
    this.states = State.getStatesOfCountry('US');
  }

  onStateSelect(state: IState): void {
    this.selectedState = state;
  }

  onSubmit(): void {
    if (this.selectedState) {
      const state = this.selectedState.name;
      this.searchResultsComponent.fetchSearchResults(state);
    }
  }
}
