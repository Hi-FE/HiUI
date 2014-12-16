!function($) {
    'use strict';

    function HiCarousel(options) {
        this.$carousel = $(options.dom);

        this.init();
        this.switchControl();
    }

    HiCarousel.prototype.init = function() {
        //        this.refreshToTop();
        this.$carousel.find('.carousel-item.active').show();
    }

    HiCarousel.prototype.switchControl = function() {
        var self = this,
            click_limit = false,
            $items = self.$carousel.find('.carousel-item'),
            $to_indexs = self.$carousel.find('.to-index');

        self.$carousel.on('click', '.to', function() {
            if(click_limit == false) {
                click_limit = true;

                var $this = $(this),
                    $active_item = self.$carousel.find('.carousel-item.active');

                if($this.hasClass('to-prev')) {
                    if($active_item.index() > 0) {
                        $active_item.prev().addClass('active').fadeIn(400);
                    } else {
                        $items.eq(-1).addClass('active').fadeIn(400);
                    }
                    $active_item.removeClass('active').fadeOut(400);
                } else if($this.hasClass('to-next')) {
                    if($active_item.index() < $items.length - 1) {
                        $active_item.next().addClass('active').fadeIn(400);
                    } else {
                        $items.eq(0).addClass('active').fadeIn(400);
                    }
                    $active_item.removeClass('active').fadeOut(400);
                } else if($this.hasClass('to-index') && !$this.hasClass('active')) {
                    $items.eq($this.index()).addClass('active').fadeIn(400);
                    $active_item.removeClass('active').fadeOut(400);
                }

                $to_indexs.removeClass('active').eq(self.$carousel.find('.carousel-item.active').index()).addClass('active');
                setTimeout(function() {
                    click_limit = false;
                }, 400)
            }
        });
    }

    window.HiCarousel = HiCarousel;

}(jQuery);






