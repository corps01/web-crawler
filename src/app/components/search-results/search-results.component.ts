import { Component, OnInit } from '@angular/core';
import { SearchApiService } from 'src/app/services/search-api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  savedLinks: any[] = [];
  showInbox: boolean = true;
  selectedTab: string = 'inbox';
  notifications: any[] = [
    {
      job_id: 5498327,
      workspace_id: 34159,
      workspace_name: '📗 Workspace 1',
      url: 'https://rumzerincentives.wordpress.com/2024/07/01/7/',
      description: 'WordPress',
      datetime:
        'Mon Jul 22 2024 13:51:38 GMT+0000 (Coordinated Universal Time)',
      preview:
        'https://vp-files-ore.s3.us-west-2.amazonaws.com/resources/3months/2rs5BKKAbstn1NM3EPDGKLeUgOw~vPOqqYwBCcNET2MVsHYIX2KhYoA_diff.png',
      original:
        'https://s3.us-west-2.amazonaws.com/vp-files-ore/resources/3months/2rs5BKKAbstn1NM3EPDGKLeUgOw.png',
      change: '0.10189845716161505 %',
      view_changes:
        'https://visualping.io/autologin?redirect=%2Fjobs%2F5498327%3Fmode%3Dvisual',
      text_changes:
        'https://vp-files-ore.s3.us-west-2.amazonaws.com/resources/3months/2rs5BKKAbstn1NM3EPDGKLeUgOw~vPOqqYwBCcNET2MVsHYIX2KhYoA_diff.html',
      added_text: '35; 25',
      removed_text: '55; 35',
      summarizer:
        'Taxpayers will now receive a 35% deduction on state income tax for electric motor trucks, down from 55%, and a 25% reduction in property taxes for related facilities, down from 35%.',
      important: 'no analyzer call',
    },
  ];

  constructor(
    private searchApiService: SearchApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchSearchResults('California');

    this.notificationService.getNotifications().subscribe((data: any) => {
      if (data && data.length > 0) {
        this.notifications = data.reverse();
      }
      console.log('this.notifications ---->', this.notifications);
    });
  }

  discardResult(resultId): void {
    this.searchResults = this.searchResults.filter(
      (searchResult) => resultId.redirect_link !== searchResult.redirect_link
    );
  }

  removeFromArchived(resultId): void {
    this.savedLinks = this.savedLinks.filter(
      (searchResult) => resultId.redirect_link !== searchResult.redirect_link
    );
    this.searchResults.push(resultId);
  }

  toggleView(view: string) {
    this.showInbox = view === 'inbox';
  }

  saveResult(resultId): void {
    this.savedLinks.push(resultId);

    this.searchResults = this.searchResults.filter(
      (searchResult) => resultId.redirect_link !== searchResult.redirect_link
    );
  }

  getIndicatorStyle() {
    if (this.selectedTab === 'processing') {
      return { left: '33.333333333333336%' };
    }

    if (this.selectedTab === 'notifications') {
      return { left: '66.666666666666672%' };
    }

    return { left: '0%' };
  }

  async fetchSearchResults(state: string) {
    this.searchApiService.getSearchResults(state).subscribe(
      (results) => {
        this.searchResults = results.map((searchResult: any) => {
          return {
            position: searchResult.position,
            title: searchResult.title,
            link: searchResult.link,
            redirect_link: searchResult.redirect_link,
            displayed_link: searchResult.displayed_link,
            thumbnail: searchResult.thumbnail,
            favicon: searchResult.favicon,
            snippet: searchResult.snippet,
            snippet_highlighted_words: searchResult.snippet_highlighted_words,
            source: searchResult.source,
          };
        });
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
}
