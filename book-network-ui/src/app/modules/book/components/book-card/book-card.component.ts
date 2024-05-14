import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {


  private _book: BookResponse = {};
  private _managed: boolean = false;
  private _bookCover: String | undefined;

  get bookCover(): String | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64, ' + this._book.cover;
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get managed(): boolean {
    return this._managed;
  }

  @Input()
  set managed(value: boolean) {
    this._managed = value;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>;


  onShowDetails() {
    this.details.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }
}
