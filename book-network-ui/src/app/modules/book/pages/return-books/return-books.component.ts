import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss']
})
export class ReturnBooksComponent implements OnInit{
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  selectedBook: BorrowedBookResponse | undefined = undefined;
  message: string = '';
  level: string = 'success';

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }



  private findAllBorrowedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: (res) => {
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    })
  }


  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned) {
      this.level = 'error';
      this.message= 'Book return can not be approved';
      return;
    }
    this.bookService.returnBorrowBook({
      'book-id' : book.id as number
    }).subscribe({
      next: () =>  {
        this.level = 'success';
        this.message= 'Book returned approved';
        this.findAllBorrowedBooks();
      },
      error: (err) => {

      }
    })
  }
}
