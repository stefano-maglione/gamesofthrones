import { Component, OnInit } from '@angular/core';
import { IBook } from './book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './book.service';

@Component({
  selector: 'app-gm-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  pageTitle = 'Book Detail';
  errorMessage = '';
  book: IBook | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getBook(id);
    }
  }

  getBook(isbn: string): void {
    console.log(isbn);
    this.bookService.getBook(isbn).subscribe({
      next: book => this.book = book,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/books']);
  }
}


