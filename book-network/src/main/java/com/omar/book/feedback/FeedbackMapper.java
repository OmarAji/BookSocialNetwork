package com.omar.book.feedback;

import com.omar.book.book.Book;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {
    public Feedback toFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .book(
                        Book.builder()
                                .id(request.bookId())
                                .build()
                )
                .comment(request.comment())
                .note(request.note())
                .build();
    }


    public FeedbackResponse toFeedbackResponse(Feedback feedback, Integer userId) {
        return FeedbackResponse.builder()
                .comment(feedback.getComment())
                .note(feedback.getNote())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
                .build();
    }
}
