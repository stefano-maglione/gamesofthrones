import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PaginationModule } from "../pagination/pagination.module";
import { BooksComponent } from "./books/book-list.component";
import { CharactersComponent } from "./characters/characters.component";
import { HouseComponent } from "./house/house.component";

@NgModule({
    declarations: [
        HouseComponent,
        BooksComponent,
        CharactersComponent
    ],
    imports: [
        CommonModule,
        PaginationModule,
    ],
    exports: [
        BooksComponent
    ]
})
export class ResourcesModule { }
