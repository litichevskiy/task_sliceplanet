(function() {

    document.addEventListener("DOMContentLoaded", function() {

        let wrapper_slick = new Wrapper_slick({
            container: document.querySelector('.slider'),
            prev: document.querySelector('.next_img'),
            next: document.querySelector('.prev_img'),
            listUrlBig:[
                'img/slider/slide_1.png',
                'img/slider/slide_1.png',
                'img/slider/slide_1.png'
            ],

            listUrlSmall:[
                'img/slider/slider_small_device.png',
                'img/slider/slider_small_device.png',
                'img/slider/slider_small_device.png'
            ],

            minWidth: 768
        });

        setTimeout(function(){

            let container = document.querySelector('.main_container'),
                load_elem = document.querySelector('.loaded');

            container.style.opacity = '1';
            load_elem.style.display = 'none';

        }, 100 );

    });

})();