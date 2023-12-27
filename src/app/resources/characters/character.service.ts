import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    catchError, Observable, tap, throwError
} from "rxjs";

import { ICharacter } from "./character";

@Injectable({
    providedIn: "root"
})
export class CharacterService {
    private characterUrl = "https://www.anapioficeandfire.com/api/characters";

    constructor(private http: HttpClient) { }

    getCharacter(id: string) : Observable<HttpResponse<ICharacter>> {
        return this.http.get<ICharacter>(`${this.characterUrl}/${id}`, { observe: "response" })
            .pipe(
                tap((response) => console.log("ONE: ", JSON.stringify(response.body))),
                catchError(this.handleError)
            );
    }

    getCharacters(url: string): Observable<HttpResponse<ICharacter[]>> {
        return this.http.get<ICharacter[]>(url, { observe: "response" })
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
