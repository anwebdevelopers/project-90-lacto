document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

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
            // if ( buttonNav.classList.contains( 'active' ) ) {
            //     buttonNav.classList.remove('active');
            //     elemNav.classList.remove('active');
            // } else {
            //     buttonNav.classList.add( 'active' );
            //     elemNav.classList.add('active');
            // }

            buttonNav.toggleAttribute('active')
            elemNav.toggleAttribute('active')
        } );

        // window.addEventListener( 'resize', function() {
        //
        //     const newWindowWidth = window.innerWidth;
        //
        //     if ( windowWidth !== newWindowWidth ) {
        //
        //         windowWidth = newWindowWidth;
        //
        //         buttonNav.classList.remove('active');
        //         // elemNav.style.display = '';
        //         elemNav.classList.remove('active');
        //     }
        // } );

        // const navMenuElems = document.querySelectorAll( '.header__nav ul a' );
        //
        // for ( let i = 0; i < navMenuElems.length; i++ ) {
        //     navMenuElems[ i ].addEventListener( 'click', function( event ) {
        //         buttonNav.classList.remove('active');
        //         elemNav.classList.remove('active');
        //     } );
        // }

    } () );

    /*******************************************************/
    //HERO SLIDER
    /*******************************************************/
    ( function( $ ) {

        $( '.hero__box' ).each( function () {
            const $hero__box = $( this );
            $hero__box.wrap('<div class="hero__slider"></div>')
                .before('<div class="hero__head"><div class="hero__head-container swiper-container"><div class="hero__head-wrapper swiper-wrapper"></div></div></div>')

                // .prev('.activity__services-head')
                // .append( '<div class="activity__services-thumbs"><div class="activity__services-thumbs-container swiper-container"><div class="activity__services-thumbs-wrapper swiper-wrapper"></div></div></div>' )
                // .end()
                .find( '.hero__item' )
                .addClass( 'swiper-slide' )
                .wrapAll( '<div class="hero__container swiper-container"><div class="hero__wrapper swiper-wrapper"></div></div>' )
                .each( function () {
                    $hero__box.closest('.hero__slider').find('.hero__head-wrapper').append( $( this ).find('.hero__item-image').addClass( 'swiper-slide' ) )


                    //$( this ).find('.hero__item-image').appendTo($hero__box.closest('.activity__slider').find('.hero__head'))
                } )
                .end().append( '<div class="hero__dots"></div>' );

            const heroHeadSwiper = new Swiper( $hero__box.closest('.hero__slider').find( '.hero__head-container' ), {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                //loopedSlides: 10,
                //freeMode: true,
                // direction: 'vertical',

                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                speed: 2500,
                // autoplay: {
                //     delay: 3000,
                // },
            });

            const heroSwiper = new Swiper( $hero__box.find( '.hero__container' ), {
                slidesPerView: 1,
                speed: 1500,
                spaceBetween: 0,
                //autoHeight: true,
                loop: true,
                //loopedSlides: 10,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,

                autoplay: {
                    delay: 5000,
                },
                // thumbs: {
                //     swiper: heroHeadSwiper
                // },
                pagination: {
                    el: $hero__box.find('.hero__dots'),
                    clickable: true,
                    type: 'bullets',
                },
                on: {
                    paginationRender: function () {

                        const thisSwiper = this;

                        $(thisSwiper.pagination.bullets).each(function(i) {

                            //const itemandex = i;

                            $(this).text(/*$(thisSwiper.slides).eq(itemandex).attr('data-services-title')*/ i + 1 );

                        });
                    }
                },
            } );

            // heroHeadSwiper.on('click', function () {
            //     console.log(heroHeadSwiper.clickedIndex, heroHeadSwiper.clickedSlide);
            //     heroHeadSwiper.slideTo(heroHeadSwiper.clickedIndex, 800, false);
            // });

            heroSwiper.on('slideChange', function () {
                heroHeadSwiper.slideTo(heroSwiper.activeIndex, 2000, false);
            });

            window.addEventListener( 'resize', function () {
                heroHeadSwiper.updateSize();
                heroSwiper.updateSize();
            } );
        } );

    } ( jQuery ) );

    /*******************************************************/
    //HERO PARALLAX
    /*******************************************************/
    ( function( $ ) {
        $( '.hero__parallax' ).each( function () {
            var scene = this;
            var parallaxInstance = new Parallax(scene, {
                relativeInput: true,
                clipRelativeInput: true,
                // calibrateX: true,
                // calibrateY: true,
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



    } ( jQuery ) );


});