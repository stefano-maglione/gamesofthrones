import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, catchError } from 'rxjs';
import { BookService } from '../resources/books/book.service';
import { CharacterService } from '../resources/characters/character.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private bookService: BookService, private characterService: CharacterService) { }

  universalSearch(searchQuery: string): Observable<any> {
    // Use forkJoin to combine results from both services
    return forkJoin([
      this.bookService.getBooksByName(searchQuery),
      this.characterService.getCharactersByName(searchQuery)
    ]).pipe(
      map(([books, characters]) => ({ books, characters })),
      catchError(error => {
        console.error('Error in universalSearch:', error);
        return [];
      })
    );
  }
}
