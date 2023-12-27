import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ICharacter } from "./character";
import { CharacterService } from "./character.service";

@Component({
    selector: "app-gm-character-detail",
    templateUrl: "./character-detail.component.html",
    styleUrls: ["./character-detail.component.css"]
})
export class CharacterDetailComponent implements OnInit {
    pageTitle = "Character Detail";
    errorMessage = "";
    character: ICharacter | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private characterService: CharacterService
    ) {
    }

    ngOnInit(): void {
        const id = String(this.route.snapshot.paramMap.get("id"));
        console.log(id);
        if (id) {
            this.getCharacter(id);
        }
    }

    getCharacter(id: string): void {
        console.log(id);
        this.characterService.getCharacter(id).subscribe({
            next: (response: HttpResponse<ICharacter>) => {
                console.log("Character Response:", response.body);

                if (response.body) {
                    // Handle the character data here
                    this.character = response.body; // Assign the first character from the array
                    console.log("Character:", this.character);
                } else {
                    console.log("Character not found");
                }
            },
            error: (err) => {
                console.error("Error fetching character:", err);
                // Handle the error as needed
            },
        });
    }

    onBack(): void {
        this.router.navigate(["/characters"]);
    }
}
