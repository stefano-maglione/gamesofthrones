import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { ICharacter } from "./character";
import { CharacterService } from "./character.service";

@Component({
    selector: "app-gm-characters",
    templateUrl: "./characters.component.html",
    styleUrls: ["./characters.component.css"]
})
export class CharactersComponent implements OnInit, OnDestroy {
    sub!: Subscription;
    errorMessage = "";
    characters: ICharacter[] = [];

    totalPages = 1;
    currentPage = 1;
    prevPageUrl: string | null = "test1";
    nextPageUrl: string | null = "test1";

    private _listFilter = "";
    filteredCharacters: ICharacter[] = [];
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredCharacters = this.performFilter(value);
    }

    constructor(private characterService: CharacterService) { }

    ngOnInit(): void {
        this.loadPage("https://www.anapioficeandfire.com/api/characters");
    }

    loadPage(url: string): void {
        this.sub = this.characterService.getCharacters(url).subscribe({
            next: (response: HttpResponse<ICharacter[]>) => {
                if (response.body !== null) {
                    this.characters = response.body;
                    this.filteredCharacters = this.characters;
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

    performFilter(filterBy: string): ICharacter[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.characters.filter((product: ICharacter) => product.name.toLocaleLowerCase().includes(filterBy));
    }

    getCharacterId(url: string): string {
        const parts = url.split("/");
        return parts[parts.length - 1];
    }

    onPageClicked(url: string): void {
        console.log(url);
        this.loadPage(url);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
