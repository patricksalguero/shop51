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


  public static initSearchBox(){
    $('#search').on('click', function (e) {
      e.preventDefault();
      $('.search-box').fadeIn();
    });
    $('.dismiss').on('click', function () {
        $('.search-box').fadeOut();
    });
  }

  public static initNavegation(){

    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');

        $('.side-navbar').toggleClass('shrinked');
        $('.content-inner').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($(window).outerWidth() > 1183) {
            if ($('#toggle-btn').hasClass('active')) {
                $('.navbar-header .brand-small').hide();
                $('.navbar-header .brand-big').show();
            } else {
                $('.navbar-header .brand-small').show();
                $('.navbar-header .brand-big').hide();
            }
        }

        if ($(window).outerWidth() < 1183) {
            $('.navbar-header .brand-small').show();
        }
      });

  }

}
