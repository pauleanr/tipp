/* Tipp v1.0 | http://blog.pauleanr.com */
;(function($) {
	$.fn.tipp = function(setting) {
		var dClass = 'tipp';
		var _d = {
			tipClass: 'tipp-tipbox',
			align: ['center', 'top'],
			shift: [0, 0],
			'z-index': 1000
		};
		var _s = $.extend(_d, setting);
		var showTip = function($focus) {
			var $tip = $focus.next('.' + dClass);
			if ($tip.length == 0) {
				var title = $focus.attr('title');
				$('body').append('<span class="' + _s.tipClass + '" style="display: none;">' + title + '</span>');
				$tip = $('.' + _s.tipClass);
				$focus.removeAttr('title').data('title', title);
			} else {
				$tip = $tip.clone().appendTo('body').addClass(_s.tipClass);
			}
			var _e = {
				tH: $tip.outerHeight(true),
				tW: $tip.outerWidth(true),
				fW: $focus.outerWidth(),
				fH: $focus.outerHeight(),
				fO: $focus.offset(),
				horizontal: function() {
					switch(_s.align[0]) {
						case 'left': 
							return this.fO.left - this.tW;
							break;
						case 'right':
							return this.fO.left + this.fW;
							break;
						case 'center':
						default:
							return this.fO.left - this.tW/2 + this.fW/2;
							break;
					}
				},
				vertical: function(){
					switch(_s.align[1]) {
						case 'middle':
							return this.fO.top + this.fH/2 - this.tH/2;
							break;
						case 'bottom':
							return this.fO.top + this.fH;
							break;
						case 'top':
						case 'default':
							return this.fO.top - this.tH;
							break;
					}
				}
			}
			$tip.css({
				position: 'absolute',
				left: _e.horizontal() + _s.shift[0],
				top: _e.vertical() + _s.shift[1],
				'z-index': _s['z-index']
			}).show();
		}
		var dropTip = function($focus) {
			$('.' + _s.tipClass).hide().remove();
			if ($focus.data('title') != '') {
				$focus.attr('title', $focus.data('title'));
			}
		}
		if (/[1-9]\.[7-9]\.[0-9]/.test($.fn.jquery)) {
			$('body').on('mouseenter', this.selector, function() {
				showTip($(this));
			}).on('mouseleave', this.selector, function() {
				dropTip($(this));
			});
		} else {
			$(this.selector).live('mouseenter', function(){
				showTip($(this));
			}).live('mouseleave', function(){
				dropTip($(this));
			});
		}
		$('.' + dClass).hide();
		return this;
	}
})(jQuery);