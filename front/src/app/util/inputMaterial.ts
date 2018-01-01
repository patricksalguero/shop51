declare var $;
export class InputMaterial{

  public static initMaterial(){
    $('input.input-material').on('focus', function () {
      $(this).siblings('.label-material').addClass('active');
    });

    $('input.input-material').on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });
  }

}
