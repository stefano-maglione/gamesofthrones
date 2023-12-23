import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    catchError, Observable, tap, throwError
} from "rxjs";

import { IBook } from "./book";

@Injectable({
    providedIn: "root"
})
export class BookService {
    private bookUrl = "https://www.anapioficeandfire.com/api/books";

    constructor(private http: HttpClient) { }

    /* getBooks(page: number): Observable<IBook[]> {
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<IBook[]>(this.bookUrl, { params })
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  } */

    getBooks(url: string): Observable<HttpResponse<IBook[]>> {
        return this.http.get<IBook[]>(url, { observe: "response" })
            .pipe(
                tap((response) => console.log("All: ", JSON.stringify(response.body))),
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
