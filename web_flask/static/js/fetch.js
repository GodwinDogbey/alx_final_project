$(document).ready(function() {
    $('#block, #room_type').on('change', function() {
        var block = $('#block').val();
        var roomType = $('#room_type').val();


        if (block && roomType) {

            Swal.fire({
                title: 'Please wait',
                html: 'Fetching room details...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            fetchRooms(block, roomType);
        }
    });

    function fetchRooms(block, roomType) {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5003/api/v1/fetch',
            data: {
                block_id: block,
                room_type_id: roomType
            },
            success: function(response) {
                Swal.close();
                var roomSelect = $('#room_name');




    $.each(response.rooms, function(index, room) {
        roomSelect.append($('<option>', {
            value: room.id,
            text: room.room_name
        }));
    });
            },
              error: function(xhr, status, error) {
           var errorMessage = "An error occurred.";
    if (xhr.responseJSON && xhr.responseJSON.error) {
      errorMessage = xhr.responseJSON.error;
    }

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
          }

        });
    }



});
