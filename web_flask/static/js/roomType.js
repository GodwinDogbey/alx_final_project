$(document).ready(function() {
    var HOST = "http://127.0.0.1:5003/api/v1/";
    function showValidationErrors(errors) {
      var errorMessage = 'Please check the following fields:\n\n';
      for (var i = 0; i < errors.length; i++) {
        errorMessage += '- ' + errors[i] + '\n';
      }
      Swal.fire({
        title: 'Validation Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
    
    // Event listener for form submission
    $('#addRoomType').on('click', function(event) {
      event.preventDefault();
    
      // Check form validation
      var form = $('#roomTypeForm')[0];
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
    

      var formData = {
        name: $('#name').val(),
        price: $('#amount').val(),
        description: $('#description').val(),
        status: $('#status').val()
      };
    
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit the form?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: HOST + "room_type",
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
              console.log('Success:', response);
    
              Swal.fire({
                title: 'Form Submitted!',
                text: 'Your form has been submitted successfully.',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                 location.reload();
                }
              });
            },
            error: function(xhr, status, error) {
             
              Swal.fire({
                title: 'Error!',
                text: "Room Type already exist",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
              });
            }
          });
        }
      });
    });
    
    $('.edit-type').on('click', function(event) {
      event.preventDefault();
    
      var typeId = $(this).data('type-id');
    
      $.get({
        url: HOST + "room_type/" + typeId,
        success: function(block) {
          $('#name').val(block.name);
          $('#amount').val(block.price);
          $('#description').val(block.name);
          $('#status').val(block.status)

          $('#RoomTypeCU').modal('show');
        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: "Error!",
                text: error,
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
              });
        }
      });
    });
    
    
    // Delete button click event
    $('.delete-type').on('click', function(event) {
     event.preventDefault();
        var blockId = $(this).data("type-id");
        Swal.fire({
          title: "Are you sure?",
          text: "You are about to delete this room Type. This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
              url: HOST + "room_type/" + blockId,
              method: "DELETE",
              success: function (response) {
                Swal.fire({
                  title: "Deleted!",
                  text: "The block has been deleted.",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "OK",
                }).then(() => {
                  location.reload();
                });
              },
              error: function (xhr, status, error) {
                console.error("Error deleting block:", error);
                Swal.fire({
                  title: "Error!",
                  text: error,
                  icon: "error",
                  confirmButtonColor: "#d33",
                  confirmButtonText: "OK",
                });
              },
            });
          }
        });
      });
    });