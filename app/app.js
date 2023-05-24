// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/exchange.html');
    require('./assets/templates/layouts/what-we-do.html');
    require('./assets/templates/layouts/exchange-v2.html');
    require('./assets/templates/layouts/what-we-do-v2.html');
    require('./assets/templates/layouts/products.html');
    require('./assets/templates/layouts/about.html');
    require('./assets/templates/layouts/partners.html');
    require('./assets/templates/layouts/work.html');
    require('./assets/templates/layouts/media-release.html');
    require('./assets/templates/layouts/media-release-view.html');
    require('./assets/templates/layouts/commentary.html');
    require('./assets/templates/layouts/commentary-view.html');
    require('./assets/templates/layouts/contact.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('_modules/succinct');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 200 && scrolled > scrollPrev) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });

    // truncate text

    $('.news-slider__descr').succinct({
        size: 75
    });

    $('.partners-slider__text').succinct({
        size: 190
    });

    $('.commentary-main__item-title').succinct({
        size: 45
    });

    $('.commentary-main__item-text').succinct({
        size: 95
    });

    // select

    $('.select').SumoSelect();

    // scroll to id

    $(document).on("click", 'a[href*="#"]', function (e) {
        var id = $(this).attr("href");
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        var pos = $id.offset().top;
        $("body, html").animate({scrollTop: pos}, 500);
    });
    $(document).on("click", 'a[href*="#"]', function (e) {
        e.preventDefault();
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('.mobile-menu__btn').removeClass('active');
            $('body').removeClass('menu-opened');
        }
    });

    $('.mobile-menu .has-children > span').on('click', function () {
        $(this).toggleClass('opened').closest('li').find('.submenu').slideToggle();
    });

    // tabs

    $('.tabs').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
    });

    // faq

    $('.faq-head').click(function () {
        $(this).toggleClass('active').next().slideToggle();
        $('.faq-head').not(this).removeClass('active').next().slideUp();
        if ($('.faq-head').has('.active')) {
            $(this).closest($('.faq-item')).toggleClass('active');
            $('.faq-head').not(this).closest($('.faq-item')).removeClass('active');
        }
    });

    // show text
    $(".current-slider").on('click', '.slide a', function () {
        $(this)
            .hide()
            .closest(".slide")
            .find("p")
            .css({
                'display': "block",
                "overflow": "visible",
                "-webkit-line-clamp": "unset",
                'height': "auto",
                "max-height": "unset"
            });
    })

    // checkbox change

    $('.contact-form .checkbox-required input').on('change', function () {
        var btn = $(this).closest('form').find('button[type=submit]');
        if (this.checked) {
            btn.prop('disabled', false);
        } else {
            btn.prop('disabled', true);
        }
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
