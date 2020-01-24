'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {

    ( function( $ ) {

        let windowWidth = window.innerWidth;

        window.addEventListener( 'resize', function() {

            const newWindowWidth = window.innerWidth;

            if ( windowWidth !== newWindowWidth ) {
                windowWidth = newWindowWidth;
            }
        } );

        /*******************************************************/
        //MENU
        /*******************************************************/
        ( function() {

            const elemNav = document.querySelector('.header__nav'),
                buttonNav = document.querySelector('.header__nav-button');

            buttonNav.addEventListener( 'click', function( e ) {
                e.stopPropagation();

                buttonNav.toggleAttribute('active')
                elemNav.toggleAttribute('active')
            } );

        } () );

        /*******************************************************/
        //HERO SLIDER
        /*******************************************************/
        ( function($) {
            document.addEventListener('readystatechange', function() {
                if (document.readyState === 'complete') {
                    $( '.hero__box' ).each( function () {
                        const $hero__box = $( this );
                        $hero__box.wrap('<div class="hero__slider"></div>')
                            .before('<div class="hero__head"><div class="hero__head-container swiper-container"><div class="hero__head-wrapper swiper-wrapper"></div></div></div>')
                            .find( '.hero__item' )
                            .addClass( 'swiper-slide' )
                            .wrapAll( '<div class="hero__container swiper-container"><div class="hero__wrapper swiper-wrapper"></div></div>' )
                            .each( function () {
                                $hero__box.closest('.hero__slider').find('.hero__head-wrapper').append( $( this ).find('.hero__item-image').addClass( 'swiper-slide' ) )
                            } )
                            .end().append( '<div class="hero__dots"></div>' );

                        const heroHeadSwiper = new Swiper( $hero__box.closest('.hero__slider').find( '.hero__head-container' ), {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            loop: true,
                            watchSlidesVisibility: true,
                            watchSlidesProgress: true,
                            speed: 2500,
                        });

                        const heroSwiper = new Swiper( $hero__box.find( '.hero__container' ), {
                            slidesPerView: 1,
                            speed: 1500,
                            spaceBetween: 0,
                            loop: true,
                            watchSlidesVisibility: true,
                            watchSlidesProgress: true,

                            autoplay: {
                                delay: 5000,
                            },

                            pagination: {
                                el: $hero__box.find('.hero__dots'),
                                clickable: true,
                                type: 'bullets',
                            },
                            on: {
                                paginationRender: function () {

                                    const thisSwiper = this;

                                    $(thisSwiper.pagination.bullets).each(function(i) {

                                        $(this).text(i + 1 );

                                    });
                                }
                            },
                        } );

                        heroSwiper.on('slideChange', function () {
                            heroHeadSwiper.slideTo(heroSwiper.activeIndex, 2000, false);
                        });

                        window.addEventListener( 'resize', function () {
                            heroHeadSwiper.updateSize();
                            heroSwiper.updateSize();
                        } );

                    } );
                }
            });
        } (jQuery) );


        /*******************************************************/
        //HERO PARALLAX
        /*******************************************************/
        ( function($) {
            $('[data-parallax-animation]').each( function () {

                const parallaxInstance = new Parallax(this, {
                    relativeInput: true,
                    clipRelativeInput: true,
                    // calibrateX: true,
                    calibrateY: true,
                    scalarX: 12,
                    scalarY: 15,
                    invertX: false,
                    invertY: false,
                    originX: 0.1,
                    originY: 0.1,
                    //frictionX: 0.05,
                    frictionY: 0.05,
                });

                window.addEventListener( 'resize', function() {

                    windowWidth <= 768 ? parallaxInstance.disable() : parallaxInstance.enable()
                } );
            });
        } (jQuery) );

        //*********************************************************//
        //MOUSE OVER ANIMATIONS
        //*********************************************************//

        ( function($) {

            if ( window.innerWidth >= 1025 ) {

                $( '[ data-tilt-animation ]' ).tilt( {
                    maxTilt: 7,
                    transition: true,
                    speed: 1000,
                } );
            }

        } (jQuery) );

        /*******************************************************/
        //CARD ANCHOR SCROLL
        /*******************************************************/
        ( function() {

            const $scroll = $('.scroll');

            if ( $scroll.length ) {

                let startPos = $scroll.offset().top;

                $( window ).scroll( function() {

                    if ( $( window ).scrollTop() >= startPos ) {

                        if ( ! $scroll[ 0 ].hasAttribute( 'active' ) ) {
                            const navHeight = $scroll.height();
                            $scroll.css( { 'min-height': navHeight + 'px' } ).attr( 'active', '' );
                        }
                    } else {

                        $scroll.removeAttr( 'active' ).removeAttr( 'style' );
                    }
                } );

                $( window ).resize( function() {
                    startPos = $scroll.offset().top;
                } );

                $( '.scroll__nav a' ).mPageScroll2id();
            }

        } () );

        //*********************************************************//
        //ACCORDION
        //*********************************************************//

        ( function($) {
            $('.accordion').each(function() {
                var $this = $(this);
                $this/*.not(':first-child')*/.children('.accordion__box').hide();
            }).on('click', '.accordion__button', function(e) {
                e.stopPropagation();
                var $this = $(this);
                $this.closest('.accordion').hasClass('active') ? $this.closest('.accordion').removeClass('active').children('.accordion__box').slideUp(200) : $this.closest('.accordion').addClass('active').children('.accordion__box').slideDown(200).end().siblings().removeClass('active').children('.accordion__box').slideUp(200);
            });
        } (jQuery) );

        /*******************************************************/

        /*******************************************************/


    } ( jQuery ) );
});