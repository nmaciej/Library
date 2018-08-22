

$(document).ready(function () {

    var booksList = $('#books_list');

    $.ajax({
        url: "http://localhost:52964/api/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (result) {

        var booksListRecord = $('#book_tr');

        for (var i = 0; i < result.length; i++) {
            var record = booksListRecord.clone();
            record.removeClass('d-none');
            record.find('.book-title').text(result[i].Title);
            record.find('.book-author').text(result[i].Author);
            record.attr('id', result[i].ID);
            console.log(result[i].ID);
            booksList.append(record);
        }

        //Dodanie funkcjonalnoœci przycisków po wype³nieniu listy
        bookListDeleteButtonEvent(booksList);

    }).fail(function (xhr, status, err) {
        alert("Failed to get books list.");
    });

    function bookListDeleteButtonEvent(bookList) {
        booksList.on('click', 'tr:not(#book_tr) .btn-danger', function () {

            var thisTr = $(this).parent().parent().parent();
            console.log(thisTr.attr("id"));

            $.ajax({
                url: "http://localhost:52964/api/books/" + thisTr.attr("id"),
                type: "DELETE"
            }).done(function () {

                thisTr.remove();
                alert("Book deleted!");

            }).fail(function () {

                alert("Book was not deleted!");

            });
        });
    }
});