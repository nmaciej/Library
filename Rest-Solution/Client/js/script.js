

$(document).ready(function () {

    refreshList();

    //Wype³nienie listy ksi¹¿ek
    function refreshList() {
        $.ajax({
            url: "http://localhost:52964/api/books/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {



            var tbody = $('#books_list ');
            var tr = $('#book_tr');

            var rem = tbody.find('tr').not('#book_tr');

            //Remove old elements before reload
            rem.each(function () {
                $(this).remove();
            });

            for (var i = 0; i < result.length; i++) {

                var temp = tr.clone();
                temp.removeAttr('id');
                temp.removeClass('d-none');

                temp.attr('id', result[i].ID);
                temp.find('td').eq(0).text(result[i].Title);
                temp.find('td').eq(1).text(result[i].Author);

                tbody.append(temp);
            }

            //Przycisk delete
            tbody.on('click',
                '.btn-danger',
                function () {
                    deleteBtn($(this).parent().parent().parent());
                });

            //Przycisk edit
                tbody.on('click',
                    '.btn-primary',
                    function () {

                        $('#ftitle').val( $(this).parent().parent().parent().children().eq(0).text());
                        $('#fauthor').val( $(this).parent().parent().parent().children().eq(1).text());


                    });


        }
        ).fail(function (xhr, status, err) { }
        ).always(function (xhr, status) { }
        );
    }

    //Dodanie nowej ksi¹¿ki
    $('#add').click(function (e) {

        e.preventDefault();

        $.ajax({
            url: 'http://localhost:52964/api/books/',
            type: 'POST',
            data: {
                title: $('#ftitle').val(),
                author: $('#fauthor').val()
            },
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                refreshList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr.status);
                //console.log(thrownError);
            }
        });
    });



    function deleteBtn(element) {

        $.ajax({
            url: 'http://localhost:52964/api/books/' + element.attr('id'),
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {

                alert("Ud¹³o siê");

                console.log(xhr.status);
                console.log(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

});