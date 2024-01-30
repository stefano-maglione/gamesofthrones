import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    catchError, map, Observable, tap, throwError
} from "rxjs";

import { IBook } from "./book";

@Injectable({
    providedIn: "root"
})
export class BookService {
    private bookUrl = "https://www.anapioficeandfire.com/api/books";

    constructor(private http: HttpClient) { }

    getBook(isbn: string): Observable<IBook | undefined> {
        return this.getBooks(this.bookUrl).pipe(
            map((response: HttpResponse<IBook[]>) => {
                const books = response.body;
                return books ? books.find((b) => b.isbn === isbn) : undefined;
            })
        );
    }

    getBooks(url: string): Observable<HttpResponse<IBook[]>> {
        return this.http.get<IBook[]>(url, { observe: "response" })
            .pipe(
                tap((response) => console.log("All: ", JSON.stringify(response.body))),
                catchError(this.handleError)
            );
    }

    getBooksByName(query: string): Observable<HttpResponse<IBook[]>> {
        // Implement logic to search books based on the query
        const url = `${this.bookUrl}?name=${query}`;
        return this.http.get<IBook[]>(url, { observe: "response" })
          .pipe(
            catchError(this.handleError)
          );
      }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}
