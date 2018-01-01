(function ($) {

	$.fn.truncate = function() {

		var userOptions = {};
		var args = arguments; // for better minification
		var func = args.callee // dito; and much shorter than $.fn.truncate

		if ( args.length ) {

			if ( args[0].constructor == Object ) {
				userOptions = args[0];
			} else if ( args[0] == "options" ) {
				return $(this).eq(0).data("options-truncate");
			} else {
				userOptions = {
					width: parseInt(args[0]),
					tail: args[1]
				}
			}
		}

		this.css("visibility","hidden"); // Hide the element(s) while manipulating them

		// apply options vs. defaults
		var options = $.extend({}, func.defaults, userOptions);


		/**
		 * HERE WE GO!
		 **/
		return this.each(function () {

			var $this = $(this);
			$this.data("options-truncate", options);

			/**
			 * If browser implements text-overflow:ellipsis in CSS and tail is "...", use it!
			 **/
			if ( options.tail == "..." && func._native ) {

				this.style[func._native] = "ellipsis";
				/*var css_obj = {}
				css_obj[func._native] = "ellipsis";
				$this.css(css_obj);*/
				$this.css("visibility","visible");

				return true;
			}

			var width = options.width || $this.parent().width();

			var text = $this.text();
			var textlength = text.length;
			var css = "padding:0; margin:0; border:none; font:inherit;";
			var $table = $('<table style="'+ css +'width:auto;zoom:1;position:absolute;"><tr style="'+ css +'"><td style="'+ css +'white-space:nowrap;">' + options.tail + '</td></tr></table>');
			var $td = $("td", $table);
			$this.html( $table );

			var tailwidth = $td.width();
			var targetWidth = width - tailwidth;

			$td.text( text );

			if ($td.width() > width) {
				if ( options.tooltip ) {
					$this.attr("title", text);
				}

				while ($td.width() >= targetWidth ) {
					textlength--;
					$td.html($td.html().substring(0, textlength)); // .html(val) is faster than .text(val) and we already used .text(val) to strip/escape html
				}

				text = $.trim( $td.html() );
				$this.html( text + options.tail );

			} else {
				$this.html( text );
			}

			this.style.visibility = "visible";

			return true;
		});

		return true;

	};


	var css = document.documentElement.style;
	var _native = false;

	if ( "textOverflow" in css ) {
		_native = "textOverflow";
	} else if ( "OTextOverflow" in css ) {
		_native = "OTextOverflow";
	}

	$.fn.truncate._native = _native;


	$.fn.truncate.defaults = {
		tail: "&hellip;",
		tooltip: true
	};

})(jQuery);