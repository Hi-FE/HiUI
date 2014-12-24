!function($) {

    'use strict';


    function HiModal(options) {
        this.$HiModal = $(options.dom);
        this.id = options.dom;
        this.default_show = options.default_show ? options.default_show : false;
        this.bg_type = options.bg_type ? options.bg_type : 'black';

        this.init();
        this.showControl();
        this.hideControl();
    }

    HiModal.prototype.init = function() {
        this.$overlay = $('#' + this.id + ' .full-overlay');
        this.$modal = $('#' + this.id + ' .modal-wrap');

        if(this.default_show == true) {
            this.$overlay.fadeIn(200);
            this.$modal.fadeIn(200);
        }
        this.$overlay.addClass(this.bg_type);
    };

    HiModal.prototype.showControl = function() {
        var self = this;
        $(document).on('click', '*[data-target="' + self.id + '"]', function() {
            self.$overlay.fadeIn(200);
            self.$modal.fadeIn(200);
        });
    };

    HiModal.prototype.hideControl = function() {
        var self = this;
        $(document).on('click', '*[data-close="' + self.id + '"]', function() {
            self.$overlay.fadeOut(200);
            self.$modal.fadeOut(200);
        });
    };


    window.HiModal = HiModal;


}(jQuery);






