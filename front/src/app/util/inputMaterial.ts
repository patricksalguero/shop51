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

  public static initValidateLoginRegister(){
    $('#login-form').validate({
      messages: {
          loginUsername: 'Por favor ingrese un correo valido.',
          loginPassword: 'Por favor ingrese su clave.'
        }
    });

    // ------------------------------------------------------- //
    // Register form validation
    // ------------------------------------------------------ //
    $('#register-form').validate({
        messages: {
            registerUsername: 'Por favor ingrese su nombre.',
            registerEmail: 'Por favor ingrese un correo valido.',
            registerPassword: 'Por favor ingrese su contraseña.'
        }
    });
  }

}
