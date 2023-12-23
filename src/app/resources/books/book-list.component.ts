import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IBook } from "./book";
import { BookService } from "./book.service";

@Component({
    templateUrl: "./book-list.component.html",
    styleUrls: ["./book-list.component.css"]
})
export class BooksComponent implements OnInit, OnDestroy {
    sub!: Subscription;
    errorMessage = "";
    books: IBook[] = [];

    totalPages = 1;
    currentPage = 1;
    prevPageUrl: string | null = "test1";
    nextPageUrl: string | null = "test1";

    private _listFilter = '';
    filteredBooks: IBook[] = [];
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredBooks = this.performFilter(value);
    }

    constructor(private bookService: BookService) { }

    ngOnInit(): void {
        this.loadPage("https://www.anapioficeandfire.com/api/books");
    }

    loadPage(url: string): void {
        this.sub = this.bookService.getBooks(url).subscribe({
            next: (response: HttpResponse<IBook[]>) => {
                if (response.body !== null) {
                    this.books = response.body;
                    this.filteredBooks = this.books;
                }
                const linkHeader = response.headers.get("Link");
                this.extractPaginationLinks(linkHeader);
            },
            error: (err) => (this.errorMessage = err)
        });
    }

    private extractPaginationLinks(linkHeader: string | null): void {
        if (linkHeader) {
            console.log(linkHeader);
            const links = linkHeader.split(",");
            console.log("links:", links);

            const findSubArrayByRel = (rel: string) => links.find((link) => link.includes(`rel="${rel}`));
            const nextSubArray = findSubArrayByRel("next");
            const prevSubArray = findSubArrayByRel("prev");
            console.log(nextSubArray);

            if (nextSubArray) {
                const nextUrl = nextSubArray.split(";")[0].trim().slice(1, -1);
                console.log("Next URL:", nextUrl);
                this.nextPageUrl = nextUrl;
            }

            if (prevSubArray) {
                const prevUrl = prevSubArray.split(";")[0].trim().slice(1, -1);
                console.log("Prev URL:", prevUrl);
                this.prevPageUrl = prevUrl;
            }
        } else {
            this.prevPageUrl = this.nextPageUrl = null;
        }
    }

    performFilter(filterBy: string): IBook[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.books.filter((product: IBook) =>
            product.name.toLocaleLowerCase().includes(filterBy));
    }

    onPageClicked(url: string): void {
        console.log(url);
        this.loadPage(url);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
