import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

@Component({
    selector: "gm-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent {
    @Input() nextPageUrl: string | null = null;
    @Input() prevPageUrl: string | null = null;
    @Output() nextPageClicked: EventEmitter<string> = new EventEmitter<string>();
    @Output() prevPageClicked: EventEmitter<string> = new EventEmitter<string>();

    onNextPage(url : string): void {
        if (this.nextPageUrl) {
            this.nextPageClicked.emit(this.nextPageUrl);
        }
    }

    onPrevPage(url : string): void {
        if (this.prevPageUrl) {
            this.prevPageClicked.emit(this.prevPageUrl);
        }
    }
}
