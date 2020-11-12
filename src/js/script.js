$(document).ready(function(){
    $('.corusel__inner').slick({
        infinite: true,
        speed: 800,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right-arrow.svg"></button>',
        dotsClass: 'slick-dots',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                infinite: true,
                dots: true,
              }
            },
            {
              breakpoint: 767,
              settings: {
                arrows: false,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 575,
              settings: {
                arrows: false,
                infinite: true,
                dots: true
              }
            }
          ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    };

    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn();
    });
    
    $('.modal__close').on('click', function () {
      $('.overlay, #order, #consultation, #thanks').fadeOut();
    });

    $('.button_mini').on('click', function () {
      $('.overlay, #order').fadeIn();
    });
    
    $('.button_mini').each(function (i) {
      $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      })
    })

    function validateForm(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Введите ваше имя!",
            minlength: "Введите более {0} символов"
          },
          phone: {
            required: "Введите номер телефона!"
          },
          email: {
            required: "Ведите ваш email",
            email: "Неправильно введён email"
          }
        }
      })
    };

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: 'mailer/smart.php',
        date: $(this).serialize()
      }).done(function () {
        $(this).find('input').vall("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
      });
      return false;
    });
});