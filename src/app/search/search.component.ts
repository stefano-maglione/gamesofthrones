import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'gm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery: string = '';

  constructor(private router: Router, private searchService: SearchService) { }

  onSearch(): void {
    this.searchService.universalSearch(this.searchQuery).subscribe(
      (results) => {
        // Extract the actual data from HttpResponse objects
        const booksData = results.books.body; // Assuming body contains the actual data
        const charactersData = results.characters.body; // Assuming body contains the actual data
        
        // Pass extracted data to the route
        this.router.navigate(['/search-results'], { state: { books: booksData, characters: charactersData } });
      },
      (error) => {
        console.error('Error during search:', error);
      }
    );
  }


}
