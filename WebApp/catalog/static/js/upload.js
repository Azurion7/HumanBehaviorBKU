$(function () {

  $(".js-upload-videos").click(function () {
    $("#fileupload").click();
  });


  $("#fileupload").fileupload({
    dataType: 'json',
    sequentialUploads: true,

    start: function (e) {
      $("#modal-progress").modal("show");
    },

    stop: function (e) {
      $("#modal-progress").modal("hide");
    },

    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      var strProgress = progress + "%";
      $(".progress-bar").css({"width": strProgress});
      $(".progress-bar").text(strProgress);
    },

    done: function (e, data) {
      console.log(data);
      if (data.result.is_valid) {
        $("#gallery tbody").prepend(
          `<tr>
            <td>
              <a href='/catalog/c3d-new/${data.result.url}'> ${data.result.name} </a>
            </td>
            <td>
              <span> ${data.result.filesize}</span>
            </td>
            <td>
              <button type="submit" class="btn btn-danger js-delete-videos pull-right" data-type='DELETE' data-id='${data.result.id}'>
                <span class="glyphicon glyphicon-trash"></span> Delete
              </button>
            </td>
          </tr>`
        )
      }
    }

  });

  $('.js-extract-feature').click(function() {
    var progress;
    $("#modal-progress").modal("show");
    for(progress = 0; progress <= 100; progress += 10){
      var strProgress = progress + '%';
      console.log(strProgress);
      $(".progress-bar").css({"width": strProgress});
      $(".progress-bar").text(strProgress);
    }
    $("#modal-progress").modal("hide");
  });

  $('.js-delete-videos').click(function() {
    console.log($(this).attr('data-type'));
    let closest_tr = $(this).closest('tr');
    $.ajax({
      type: 'POST',
      url: '/catalog/delete-videos',
      data: {
        type: $(this).attr('data-type'),
        // files: Array($(this).attr('data-url')),
        ids: Array($(this).attr('data-id')),
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
      },
      success: function(data) {
        if (data.success){
          closest_tr.remove();
        }
        else
          console.log('delete error');
      }
    })
  });
});