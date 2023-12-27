import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PaginationModule } from "../pagination/pagination.module";
import { BookDetailComponent } from "./books/book-detail.component";
import { BooksComponent } from "./books/book-list.component";
import { CharacterDetailComponent } from "./characters/character-detail.component";
import { CharactersComponent } from "./characters/characters.component";
import { HouseComponent } from "./house/house.component";

@NgModule({
    declarations: [
        HouseComponent,
        BooksComponent,
        CharactersComponent,
        BookDetailComponent,
        CharacterDetailComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: "books", component: BooksComponent },
            { path: "characters", component: CharactersComponent },
            { path: "houses", component: HouseComponent },
            {
                path: "books/:id",
                component: BookDetailComponent
            },
            {
                path: "characters/:id",
                component: CharacterDetailComponent
            }
        ]),
        CommonModule,
        PaginationModule,
        FormsModule
    ],
    exports: [
        BooksComponent
    ]
})
export class ResourcesModule { }
