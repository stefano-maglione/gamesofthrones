import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface SearchResultsData {
  books: any[]; // Adjust the type according to the structure of your data
  characters: any[]; // Adjust the type according to the structure of your data
}

@Component({
  selector: 'gm-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  books!: any[];
  characters!: any[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.books = this.router.getCurrentNavigation()?.extras?.state?.['books']; // should log out 'bar'
    this.characters = this.router.getCurrentNavigation()?.extras?.state?.['characters']; // should log out 'bar'
    console.log(this.characters);
    console.log(this.books);
  }

  ngOnInit(): void {




  }
}
