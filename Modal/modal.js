!function($) {

    'use strict';


    function HiModal(options) {
        this.$HiModal = $(options.dom);
        this.id = options.dom;

        this.init();
        this.show();
        this.hide();
    }

    HiModal.prototype.init = function() {
        this.$overlay = $('#' + this.id + ' .full-overlay');
        this.$modal = $('#' + this.id + ' .modal-wrap');
        console.log(this.$modal);

    };

    HiModal.prototype.show = function() {
        var self = this;
        $(document).on('click', '*[data-target="' + self.id + '"]', function() {
            self.$overlay.fadeIn(200);
            self.$modal.fadeIn(200);
        });
    };

    HiModal.prototype.hide = function() {
        var self = this;
        self.$overlay.on('click', function() {
            self.$overlay.fadeOut(200);
            self.$modal.fadeIn(200);
        });
    };


    window.HiModal = HiModal;


}(jQuery);






