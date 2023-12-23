import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";



import { AppComponent } from "./app.component";
import { OverviewModule } from "./overview/overview.module";
import { OverviewComponent } from "./overview/overview/overview.component";
import { BooksComponent } from "./resources/books/book-list.component";
import { ResourcesModule } from "./resources/resources.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ResourcesModule,
        OverviewModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: "home", component: OverviewComponent },
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "**", redirectTo: "home", pathMatch: "full" }
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
