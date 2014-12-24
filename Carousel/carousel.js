!function($) {

    'use strict';


    function HiCarousel(options) {
        this.$carousel = $(options.dom);
        this.type = options.type ? options.type : 'scroll';
        this.time = options.time ? options.time : '400';

        this.init();
        this.switchControl();
    }

    HiCarousel.prototype.init = function() {
        this.$items = this.$carousel.find('.carousel-item');
        this.$list = this.$carousel.find('.carousel-list');
        this.click_limit = false;

        switch(this.type) {
            case 'fade' :
                this.$to_indexs = this.$carousel.find('.to-index');
                this.$carousel.addClass('fade');
                this.$carousel.find('.carousel-item.active').show();
                break;
            case 'scroll' :
                this.$carousel.addClass('scroll');
                this.active_index = 0;
                this.item_width = this.$items.eq(0).width();
                this.$carousel.find('.carousel-list').append(this.$items.clone());
                break;
        }
    };

    HiCarousel.prototype.switchControl = function() {
        var self = this;

        self.$carousel.on('click', '.to', function() {
            if(self.click_limit == false) {
                self.click_limit = true;

                switch(self.type) {
                    case 'fade' :
                        self.switchByType.fade(self, $(this));
                        break;
                    case 'scroll' :
                        self.switchByType.scroll(self, $(this));
                        break;
                }

                setTimeout(function() {
                    self.click_limit = false;
                }, self.time + 50)
            }
        });
    };

    HiCarousel.prototype.switchByType = {
        'fade' : function(self, $this) {
            var $active_item = self.$carousel.find('.carousel-item.active');

            if($this.hasClass('to-prev')) {
                if($active_item.index() > 0) {
                    $active_item.prev().addClass('active').fadeIn(self.time);
                } else {
                    self.$items.eq(-1).addClass('active').fadeIn(self.time);
                }
                $active_item.removeClass('active').fadeOut(self.time);
            } else if($this.hasClass('to-next')) {
                if($active_item.index() < self.$items.length - 1) {
                    $active_item.next().addClass('active').fadeIn(self.time);
                } else {
                    self.$items.eq(0).addClass('active').fadeIn(self.time);
                }
                $active_item.removeClass('active').fadeOut(self.time);
            } else if($this.hasClass('to-index') && !$this.hasClass('active')) {
                self.$items.eq($this.index()).addClass('active').fadeIn(self.time);
                $active_item.removeClass('active').fadeOut(self.time);
            }

            self.$to_indexs.removeClass('active').eq(self.$carousel.find('.carousel-item.active').index()).addClass('active');
        },
        'scroll' : function(self, $this) {
            if($this.hasClass('to-prev')) {
                self.active_index--;
                if(self.active_index < 0) {
                    self.$list.css('left', -self.item_width * self.$items.length);
                    self.active_index = self.$items.length - 1;
                }
                self.$list.animate({
                    'left' : '+=' + self.item_width
                }, self.time);
            } else if($this.hasClass('to-next')) {
                self.active_index++;
                self.$list.animate({
                    'left' : '-=' + self.item_width
                }, self.time, function() {
                    if(self.active_index >= self.$items.length) {
                        self.$list.css('left', 0);
                        self.active_index = 0;
                    }
                });
            }
        }
    };

    window.HiCarousel = HiCarousel;


}(jQuery);






