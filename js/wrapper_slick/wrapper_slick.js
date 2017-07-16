(function( exports ) {

    const   INIT_TIME = 1000,       // ms
            SET_RESIZE_EVENT = 300; //ms

    function Wrapper_slick( data ) {

        if( !data.container || !data.prev || !data.next ) {

            throw{message:'module required container, prev, next elements'};
        }

        this.container = data.container;
        this.prev = data.prev;
        this.next = data.next;
        this.settings = data.settings || { dots: true };
        this.listUrlBig = data.listUrlBig || [];
        this.listUrlSmall = data.listUrlSmall || [];
        this.minWidth = data.minWidth || 768;
        this.maxMidth = this.minWidth + 1;


        if( window.screen.width <= this.minWidth ) this.updateUrl( this.listUrlSmall );

        else{

            if( document.body.clientWidth <= this.minWidth ) {

                this.updateUrl( this.listUrlSmall );

                this.is_big = false;
                this.is_small = true;
            }

            else {

                this.is_small = false;
                this.is_big = false;
            }

            let that = this;

            this.isReplaceUrl = this.isReplaceUrl.bind( this );

            window.addEventListener('resize', this.isReplaceUrl );
        }

        this.initSlider();
    };

    let fn = Wrapper_slick.prototype;

    fn.initSlider = function() {

        let that = this;

        $( this.container ).slick( this.settings );

        setTimeout(function() {

            that.defaultLeft = document.querySelector('.slick-prev.slick-arrow');
            that.defaultRight = document.querySelector('.slick-next.slick-arrow');

            if( !that.defaultRight || !that.defaultLeft ) throw{message:'slick button undefined'};

            that.prev.addEventListener('click', that.showPrevImg.bind( that ), true );
            that.next.addEventListener('click', that.showNextImg.bind( that ), true );

        }, INIT_TIME );
    };

    fn.showPrevImg = function() {

        $(this.defaultLeft).click();
    };

    fn.showNextImg = function() {

        $(this.defaultRight).click();
    };

    fn.isReplaceUrl = function() {

        window.removeEventListener('resize', this.isReplaceUrl );

        let that = this,
            width = document.body.clientWidth;

        setTimeout(function(){

            window.addEventListener('resize', that.isReplaceUrl );

        }, SET_RESIZE_EVENT );


        if( width <= that.minWidth ) {

            if( !that.is_small ) {

                that.updateUrl( that.listUrlSmall );

                that.is_big = false;
                that.is_small = true;
            }
        }

        else

            if( width >= that.maxMidth ) {

                if( !that.is_big ) {

                    that.updateUrl( that.listUrlBig );

                    that.is_big = true;
                    that.is_small = false;
                }
            }
    };

    fn.updateUrl = function( list ) {

        let that = this,
            listImg = this.container.querySelectorAll('img'),
            img;

        list.forEach(function( item, i ) {

            img = listImg[i].src = item;
        });
    };

    exports.Wrapper_slick = Wrapper_slick;

})( window );