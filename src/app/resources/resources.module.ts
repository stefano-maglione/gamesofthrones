import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { PaginationModule } from "../pagination/pagination.module";
import { CharactersComponent } from "./characters/characters.component";
import { HouseComponent } from "./house/house.component";
import { BookDetailComponent } from './books/book-detail.component';
import { BooksComponent } from "./books/book-list.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        HouseComponent,
        BooksComponent,
        CharactersComponent,
        BookDetailComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'books', component: BooksComponent },
            {
              path: 'books/:id',
              component: BookDetailComponent
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
