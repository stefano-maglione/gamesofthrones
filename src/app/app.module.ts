import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';


import { AppComponent } from "./app.component";
import { OverviewModule } from "./overview/overview.module";
import { OverviewComponent } from "./overview/overview/overview.component";
import { ResourcesModule } from "./resources/resources.module";
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchResultsComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        ResourcesModule,
        OverviewModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: "home", component: OverviewComponent , canActivate: [AuthGuard] },
            { path: 'search', component: SearchComponent, canActivate: [AuthGuard]  },
            { path: 'search-results', component: SearchResultsComponent, canActivate: [AuthGuard]  },
            { path: '', component: LoginComponent },
            { path: "**", redirectTo: "home", pathMatch: "full" }
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
