/*!
 * jQuery UI 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function( $, undefined ) {

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.8.14",

	keyCode: {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
});

// plugins
$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.each( [ "Width", "Height" ], function( i, name ) {
	var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
		type = name.toLowerCase(),
		orig = {
			innerWidth: $.fn.innerWidth,
			innerHeight: $.fn.innerHeight,
			outerWidth: $.fn.outerWidth,
			outerHeight: $.fn.outerHeight
		};

	function reduce( elem, size, border, margin ) {
		$.each( side, function() {
			size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
			if ( border ) {
				size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
			}
			if ( margin ) {
				size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
			}
		});
		return size;
	}

	$.fn[ "inner" + name ] = function( size ) {
		if ( size === undefined ) {
			return orig[ "inner" + name ].call( this );
		}

		return this.each(function() {
			$( this ).css( type, reduce( this, size ) + "px" );
		});
	};

	$.fn[ "outer" + name] = function( size, margin ) {
		if ( typeof size !== "number" ) {
			return orig[ "outer" + name ].call( this, size );
		}

		return this.each(function() {
			$( this).css( type, reduce( this, size, true, margin ) + "px" );
		});
	};
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		var map = element.parentNode,
			mapName = map.name,
			img;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName )
		? !element.disabled
		: "a" == nodeName
			? element.href || isTabIndexNotNaN
			: isTabIndexNotNaN)
		// the element and all of its ancestors must be visible
		&& visible( element );
}

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.curCSS( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});





// deprecated
$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var proto = $.ui[ module ].prototype;
			for ( var i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode ) {
				return;
			}
	
			for ( var i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},
	
	// will be deprecated when we switch to jQuery 1.4 - use jQuery.contains()
	contains: function( a, b ) {
		return document.compareDocumentPosition ?
			a.compareDocumentPosition( b ) & 16 :
			a !== b && a.contains( b );
	},
	
	// only used by resizable
	hasScroll: function( el, a ) {
	
		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}
	
		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;
	
		if ( el[ scroll ] > 0 ) {
			return true;
		}
	
		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},
	
	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
/*!
 * jQuery UI Widget 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

// jQuery 1.4+
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			$( elem ).triggerHandler( "remove" );
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						$( this ).triggerHandler( "remove" );
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
//	$.each( basePrototype, function( key, val ) {
//		if ( $.isPlainObject(val) ) {
//			basePrototype[ key ] = $.extend( {}, val );
//		}
//	});
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				// TODO: add this back in 1.9 and use $.error() (see #5972)
//				if ( !instance ) {
//					throw "cannot call methods on " + name + " prior to initialization; " +
//						"attempted to call method '" + options + "'";
//				}
//				if ( !$.isFunction( instance[options] ) ) {
//					throw "no such method '" + options + "' for " + name + " widget instance";
//				}
//				var methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	// allow instantiation without initializing for simple inheritance
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		// $.widget.bridge stores the plugin instance, but we do it anyway
		// so that it's stored even before the _create function runs
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var callback = this.options[ type ];

		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		data = data || {};

		// copy original event properties over to the new event
		// this would happen if we could call $.event.fix instead of $.Event
		// but we don't have a way to force an event to be fixed multiple times
		if ( event.originalEvent ) {
			for ( var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[ --i ];
				event[ prop ] = event.originalEvent[ prop ];
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
/*
 * jQuery UI Position 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function( $, undefined ) {

$.ui = $.ui || {};

var horizontalPositions = /left|center|right/,
	verticalPositions = /top|center|bottom/,
	center = "center",
	_position = $.fn.position,
	_offset = $.fn.offset;

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var target = $( options.of ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offset = options.offset ? options.offset.split( " " ) : [ 0, 0 ],
		targetWidth,
		targetHeight,
		basePosition;

	if ( targetElem.nodeType === 9 ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: 0, left: 0 };
	// TODO: use $.isWindow() in 1.9
	} else if ( targetElem.setTimeout ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: target.scrollTop(), left: target.scrollLeft() };
	} else if ( targetElem.preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
		targetWidth = targetHeight = 0;
		basePosition = { top: options.of.pageY, left: options.of.pageX };
	} else {
		targetWidth = target.outerWidth();
		targetHeight = target.outerHeight();
		basePosition = target.offset();
	}

	// force my and at to have valid horizontal and veritcal positions
	// if a value is missing or invalid, it will be converted to center 
	$.each( [ "my", "at" ], function() {
		var pos = ( options[this] || "" ).split( " " );
		if ( pos.length === 1) {
			pos = horizontalPositions.test( pos[0] ) ?
				pos.concat( [center] ) :
				verticalPositions.test( pos[0] ) ?
					[ center ].concat( pos ) :
					[ center, center ];
		}
		pos[ 0 ] = horizontalPositions.test( pos[0] ) ? pos[ 0 ] : center;
		pos[ 1 ] = verticalPositions.test( pos[1] ) ? pos[ 1 ] : center;
		options[ this ] = pos;
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	// normalize offset option
	offset[ 0 ] = parseInt( offset[0], 10 ) || 0;
	if ( offset.length === 1 ) {
		offset[ 1 ] = offset[ 0 ];
	}
	offset[ 1 ] = parseInt( offset[1], 10 ) || 0;

	if ( options.at[0] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[0] === center ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[1] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[1] === center ) {
		basePosition.top += targetHeight / 2;
	}

	basePosition.left += offset[ 0 ];
	basePosition.top += offset[ 1 ];

	return this.each(function() {
		var elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseInt( $.curCSS( this, "marginLeft", true ) ) || 0,
			marginTop = parseInt( $.curCSS( this, "marginTop", true ) ) || 0,
			collisionWidth = elemWidth + marginLeft +
				( parseInt( $.curCSS( this, "marginRight", true ) ) || 0 ),
			collisionHeight = elemHeight + marginTop +
				( parseInt( $.curCSS( this, "marginBottom", true ) ) || 0 ),
			position = $.extend( {}, basePosition ),
			collisionPosition;

		if ( options.my[0] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[0] === center ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[1] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[1] === center ) {
			position.top -= elemHeight / 2;
		}

		// prevent fractions (see #5280)
		position.left = Math.round( position.left );
		position.top = Math.round( position.top );

		collisionPosition = {
			left: position.left - marginLeft,
			top: position.top - marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[i] ] ) {
				$.ui.position[ collision[i] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: offset,
					my: options.my,
					at: options.at
				});
			}
		});

		if ( $.fn.bgiframe ) {
			elem.bgiframe();
		}
		elem.offset( $.extend( position, { using: options.using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
			position.left = over > 0 ? position.left - over : Math.max( position.left - data.collisionPosition.left, position.left );
		},
		top: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
			position.top = over > 0 ? position.top - over : Math.max( position.top - data.collisionPosition.top, position.top );
		}
	},

	flip: {
		left: function( position, data ) {
			if ( data.at[0] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					-data.targetWidth,
				offset = -2 * data.offset[ 0 ];
			position.left += data.collisionPosition.left < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		},
		top: function( position, data ) {
			if ( data.at[1] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
				myOffset = data.my[ 1 ] === "top" ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					-data.targetHeight,
				offset = -2 * data.offset[ 1 ];
			position.top += data.collisionPosition.top < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		}
	}
};

// offset setter from jQuery 1.4
if ( !$.offset.setOffset ) {
	$.offset.setOffset = function( elem, options ) {
		// set position first, in-case top/left are set even on static elem
		if ( /static/.test( $.curCSS( elem, "position" ) ) ) {
			elem.style.position = "relative";
		}
		var curElem   = $( elem ),
			curOffset = curElem.offset(),
			curTop    = parseInt( $.curCSS( elem, "top",  true ), 10 ) || 0,
			curLeft   = parseInt( $.curCSS( elem, "left", true ), 10)  || 0,
			props     = {
				top:  (options.top  - curOffset.top)  + curTop,
				left: (options.left - curOffset.left) + curLeft
			};
		
		if ( 'using' in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	};

	$.fn.offset = function( options ) {
		var elem = this[ 0 ];
		if ( !elem || !elem.ownerDocument ) { return null; }
		if ( options ) { 
			return this.each(function() {
				$.offset.setOffset( this, options );
			});
		}
		return _offset.call( this );
	};
}

}( jQuery ));
/*
 * jQuery UI Autocomplete 1.8.14
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function( $, undefined ) {

// used to prevent race conditions with remote data sources
var requestIndex = 0;

$.widget( "ui.autocomplete", {
	options: {
		appendTo: "body",
		autoFocus: false,
		delay: 300,
		minLength: 1,
		position: {
			my: "left top",
			at: "left bottom",
			collision: "none"
		},
		source: null
	},

	pending: 0,

	_create: function() {
		var self = this,
			doc = this.element[ 0 ].ownerDocument,
			suppressKeyPress;

		this.element
			.addClass( "ui-autocomplete-input" )
			.attr( "autocomplete", "off" )
			// TODO verify these actually work as intended
			.attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			})
			.bind( "keydown.autocomplete", function( event ) {
				if ( self.options.disabled || self.element.attr( "readonly" ) ) {
					return;
				}

				suppressKeyPress = false;
				var keyCode = $.ui.keyCode;
				switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					self._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					self._move( "nextPage", event );
					break;
				case keyCode.UP:
					self._move( "previous", event );
					// prevent moving cursor to beginning of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.DOWN:
					self._move( "next", event );
					// prevent moving cursor to end of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					// when menu is open and has focus
					if ( self.menu.active ) {
						// #6055 - Opera still allows the keypress to occur
						// which causes forms to submit
						suppressKeyPress = true;
						event.preventDefault();
					}
					//passthrough - ENTER and TAB both select the current element
				case keyCode.TAB:
					if ( !self.menu.active ) {
						return;
					}
					self.menu.select( event );
					break;
				case keyCode.ESCAPE:
					self.element.val( self.term );
					self.close( event );
					break;
				default:
					// keypress is triggered before the input value is changed
					clearTimeout( self.searching );
					self.searching = setTimeout(function() {
						// only search if the value has changed
						if ( self.term != self.element.val() ) {
							self.selectedItem = null;
							self.search( null, event );
						}
					}, self.options.delay );
					break;
				}
			})
			.bind( "keypress.autocomplete", function( event ) {
				if ( suppressKeyPress ) {
					suppressKeyPress = false;
					event.preventDefault();
				}
			})
			.bind( "focus.autocomplete", function() {
				if ( self.options.disabled ) {
					return;
				}

				self.selectedItem = null;
				self.previous = self.element.val();
			})
			.bind( "blur.autocomplete", function( event ) {
				if ( self.options.disabled ) {
					return;
				}

				clearTimeout( self.searching );
				// clicks on the menu (or a button to trigger a search) will cause a blur event
				self.closing = setTimeout(function() {
					self.close( event );
					self._change( event );
				}, 150 );
			});
		this._initSource();
		this.response = function() {
			return self._response.apply( self, arguments );
		};
		this.menu = $( "<ul></ul>" )
			.addClass( "ui-autocomplete" )
			.appendTo( $( this.options.appendTo || "body", doc )[0] )
			// prevent the close-on-blur in case of a "slow" click on the menu (long mousedown)
			.mousedown(function( event ) {
				// clicking on the scrollbar causes focus to shift to the body
				// but we can't detect a mouseup or a click immediately afterward
				// so we have to track the next mousedown and close the menu if
				// the user clicks somewhere outside of the autocomplete
				var menuElement = self.menu.element[ 0 ];
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
					setTimeout(function() {
						$( document ).one( 'mousedown', function( event ) {
							if ( event.target !== self.element[ 0 ] &&
								event.target !== menuElement &&
								!$.ui.contains( menuElement, event.target ) ) {
								self.close();
							}
						});
					}, 1 );
				}

				// use another timeout to make sure the blur-event-handler on the input was already triggered
				setTimeout(function() {
					clearTimeout( self.closing );
				}, 13);
			})
			.menu({
				focus: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" );
					if ( false !== self._trigger( "focus", event, { item: item } ) ) {
						// use value to match what will end up in the input, if it was a key event
						if ( /^key/.test(event.originalEvent.type) ) {
							self.element.val( item.value );
						}
					}
				},
				selected: function( event, ui ) {
					var item = ui.item.data( "item.autocomplete" ),
						previous = self.previous;

					// only trigger when focus was lost (click on menu)
					if ( self.element[0] !== doc.activeElement ) {
						self.element.focus();
						self.previous = previous;
						// #6109 - IE triggers two focus events and the second
						// is asynchronous, so we need to reset the previous
						// term synchronously and asynchronously :-(
						setTimeout(function() {
							self.previous = previous;
							self.selectedItem = item;
						}, 1);
					}

					if ( false !== self._trigger( "select", event, { item: item } ) ) {
						self.element.val( item.value );
					}
					// reset the term after the select event
					// this allows custom select handling to work properly
					self.term = self.element.val();

					self.close( event );
					self.selectedItem = item;
				},
				blur: function( event, ui ) {
					// don't set the value of the text field if it's already correct
					// this prevents moving the cursor unnecessarily
					if ( self.menu.element.is(":visible") &&
						( self.element.val() !== self.term ) ) {
						self.element.val( self.term );
					}
				}
			})
			.zIndex( this.element.zIndex() + 1 )
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			.css({ top: 0, left: 0 })
			.hide()
			.data( "menu" );
		if ( $.fn.bgiframe ) {
			 this.menu.element.bgiframe();
		}
	},

	destroy: function() {
		this.element
			.removeClass( "ui-autocomplete-input" )
			.removeAttr( "autocomplete" )
			.removeAttr( "role" )
			.removeAttr( "aria-autocomplete" )
			.removeAttr( "aria-haspopup" );
		this.menu.element.remove();
		$.Widget.prototype.destroy.call( this );
	},

	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		if ( key === "source" ) {
			this._initSource();
		}
		if ( key === "appendTo" ) {
			this.menu.element.appendTo( $( value || "body", this.element[0].ownerDocument )[0] )
		}
		if ( key === "disabled" && value && this.xhr ) {
			this.xhr.abort();
		}
	},

	_initSource: function() {
		var self = this,
			array,
			url;
		if ( $.isArray(this.options.source) ) {
			array = this.options.source;
			this.source = function( request, response ) {
				response( $.ui.autocomplete.filter(array, request.term) );
			};
		} else if ( typeof this.options.source === "string" ) {
			url = this.options.source;
			this.source = function( request, response ) {
				if ( self.xhr ) {
					self.xhr.abort();
				}
				self.xhr = $.ajax({
					url: url,
					data: request,
					dataType: "json",
					autocompleteRequest: ++requestIndex,
					success: function( data, status ) {
						if ( this.autocompleteRequest === requestIndex ) {
							response( data );
						}
					},
					error: function() {
						if ( this.autocompleteRequest === requestIndex ) {
							response( [] );
						}
					}
				});
			};
		} else {
			this.source = this.options.source;
		}
	},

	search: function( value, event ) {
		value = value != null ? value : this.element.val();

		// always save the actual value, not the one passed as an argument
		this.term = this.element.val();

		if ( value.length < this.options.minLength ) {
			return this.close( event );
		}

		clearTimeout( this.closing );
		if ( this._trigger( "search", event ) === false ) {
			return;
		}

		return this._search( value );
	},

	_search: function( value ) {
		this.pending++;
		this.element.addClass( "ui-autocomplete-loading" );

		this.source( { term: value }, this.response );
	},

	_response: function( content ) {
		if ( !this.options.disabled && content && content.length ) {
			content = this._normalize( content );
			this._suggest( content );
			this._trigger( "open" );
		} else {
			this.close();
		}
		this.pending--;
		if ( !this.pending ) {
			this.element.removeClass( "ui-autocomplete-loading" );
		}
	},

	close: function( event ) {
		clearTimeout( this.closing );
		if ( this.menu.element.is(":visible") ) {
			this.menu.element.hide();
			this.menu.deactivate();
			this._trigger( "close", event );
		}
	},
	
	_change: function( event ) {
		if ( this.previous !== this.element.val() ) {
			this._trigger( "change", event, { item: this.selectedItem } );
		}
	},

	_normalize: function( items ) {
		// assume all items have the right format when the first item is complete
		if ( items.length && items[0].label && items[0].value ) {
			return items;
		}
		return $.map( items, function(item) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend({
				label: item.label || item.value,
				value: item.value || item.label
			}, item );
		});
	},

	_suggest: function( items ) {
		var ul = this.menu.element
			.empty()
			.zIndex( this.element.zIndex() + 1 );
		this._renderMenu( ul, items );
		// TODO refresh should check if the active item is still in the dom, removing the need for a manual deactivate
		this.menu.deactivate();
		this.menu.refresh();

		// size and position menu
		ul.show();
		this._resizeMenu();
		ul.position( $.extend({
			of: this.element
		}, this.options.position ));

		if ( this.options.autoFocus ) {
			this.menu.next( new $.Event("mouseover") );
		}
	},

	_resizeMenu: function() {
		var ul = this.menu.element;
		ul.outerWidth( Math.max(
			ul.width( "" ).outerWidth(),
			this.element.outerWidth()
		) );
	},

	_renderMenu: function( ul, items ) {
		var self = this;
		$.each( items, function( index, item ) {
			self._renderItem( ul, item );
		});
	},

	_renderItem: function( ul, item) {
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( $( "<a></a>" ).text( item.label ) )
			.appendTo( ul );
	},

	_move: function( direction, event ) {
		if ( !this.menu.element.is(":visible") ) {
			this.search( null, event );
			return;
		}
		if ( this.menu.first() && /^previous/.test(direction) ||
				this.menu.last() && /^next/.test(direction) ) {
			this.element.val( this.term );
			this.menu.deactivate();
			return;
		}
		this.menu[ direction ]( event );
	},

	widget: function() {
		return this.menu.element;
	}
});

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	},
	filter: function(array, term) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( value.label || value.value || value );
		});
	}
});

}( jQuery ));

/*
 * jQuery UI Menu (not officially released)
 * 
 * This widget isn't yet finished and the API is subject to change. We plan to finish
 * it for the next release. You're welcome to give it a try anyway and give us feedback,
 * as long as you're okay with migrating your code later on. We can help with that, too.
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 *  jquery.ui.widget.js
 */
(function($) {

$.widget("ui.menu", {
	_create: function() {
		var self = this;
		this.element
			.addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
			.attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			})
			.click(function( event ) {
				if ( !$( event.target ).closest( ".ui-menu-item a" ).length ) {
					return;
				}
				// temporary
				event.preventDefault();
				self.select( event );
			});
		this.refresh();
	},
	
	refresh: function() {
		var self = this;

		// don't refresh list items that are already adapted
		var items = this.element.children("li:not(.ui-menu-item):has(a)")
			.addClass("ui-menu-item")
			.attr("role", "menuitem");
		
		items.children("a")
			.addClass("ui-corner-all")
			.attr("tabindex", -1)
			// mouseenter doesn't work with event delegation
			.mouseenter(function( event ) {
				self.activate( event, $(this).parent() );
			})
			.mouseleave(function() {
				self.deactivate();
			});
	},

	activate: function( event, item ) {
		this.deactivate();
		if (this.hasScroll()) {
			var offset = item.offset().top - this.element.offset().top,
				scroll = this.element.scrollTop(),
				elementHeight = this.element.height();
			if (offset < 0) {
				this.element.scrollTop( scroll + offset);
			} else if (offset >= elementHeight) {
				this.element.scrollTop( scroll + offset - elementHeight + item.height());
			}
		}
		this.active = item.eq(0)
			.children("a")
				.addClass("ui-state-hover")
				.attr("id", "ui-active-menuitem")
			.end();
		this._trigger("focus", event, { item: item });
	},

	deactivate: function() {
		if (!this.active) { return; }

		this.active.children("a")
			.removeClass("ui-state-hover")
			.removeAttr("id");
		this._trigger("blur");
		this.active = null;
	},

	next: function(event) {
		this.move("next", ".ui-menu-item:first", event);
	},

	previous: function(event) {
		this.move("prev", ".ui-menu-item:last", event);
	},

	first: function() {
		return this.active && !this.active.prevAll(".ui-menu-item").length;
	},

	last: function() {
		return this.active && !this.active.nextAll(".ui-menu-item").length;
	},

	move: function(direction, edge, event) {
		if (!this.active) {
			this.activate(event, this.element.children(edge));
			return;
		}
		var next = this.active[direction + "All"](".ui-menu-item").eq(0);
		if (next.length) {
			this.activate(event, next);
		} else {
			this.activate(event, this.element.children(edge));
		}
	},

	// TODO merge with previousPage
	nextPage: function(event) {
		if (this.hasScroll()) {
			// TODO merge with no-scroll-else
			if (!this.active || this.last()) {
				this.activate(event, this.element.children(".ui-menu-item:first"));
				return;
			}
			var base = this.active.offset().top,
				height = this.element.height(),
				result = this.element.children(".ui-menu-item").filter(function() {
					var close = $(this).offset().top - base - height + $(this).height();
					// TODO improve approximation
					return close < 10 && close > -10;
				});

			// TODO try to catch this earlier when scrollTop indicates the last page anyway
			if (!result.length) {
				result = this.element.children(".ui-menu-item:last");
			}
			this.activate(event, result);
		} else {
			this.activate(event, this.element.children(".ui-menu-item")
				.filter(!this.active || this.last() ? ":first" : ":last"));
		}
	},

	// TODO merge with nextPage
	previousPage: function(event) {
		if (this.hasScroll()) {
			// TODO merge with no-scroll-else
			if (!this.active || this.first()) {
				this.activate(event, this.element.children(".ui-menu-item:last"));
				return;
			}

			var base = this.active.offset().top,
				height = this.element.height();
				result = this.element.children(".ui-menu-item").filter(function() {
					var close = $(this).offset().top - base + height - $(this).height();
					// TODO improve approximation
					return close < 10 && close > -10;
				});

			// TODO try to catch this earlier when scrollTop indicates the last page anyway
			if (!result.length) {
				result = this.element.children(".ui-menu-item:first");
			}
			this.activate(event, result);
		} else {
			this.activate(event, this.element.children(".ui-menu-item")
				.filter(!this.active || this.first() ? ":last" : ":first"));
		}
	},

	hasScroll: function() {
		return this.element.height() < this.element[ $.fn.prop ? "prop" : "attr" ]("scrollHeight");
	},

	select: function( event ) {
		this._trigger("selected", event, { item: this.active });
	}
});

}(jQuery));
(function(window, $, undefined){
    var strings, tempstrings;

    strings = {
        en:{ /* English */
            /* Interface Text */
           nozipcountries: ['AG','AW','BS','BF','CO','CR','DO','GH','HN','IE','JM','ML','NA','AN','PE','VC','TG','TC','UG','VN', 'LC'],
                  proceed: "Continue",
                     save: "Save",
                      yes: "Yes",
                       no: "No",
                  restart: "Start over",
                 required: "Required",
     validateunitrequired: "Please enter your unit number or details",
             validateunit: "Please select yes or no for unit number",
             validaddress: "Physical address only (no PO Boxes)",
     validatecityrequired: "Please specify City",
  validateaddressrequired: "Please specify Address",
     validatecoderequired: "Please specify Postal Code",
          privacyreminder: "Remember: Your address is private and will not be displayed on the website.",
               choosebest: "Please choose the closest match to your address, or broaden your details. <span>Try using \"City, State\" or \"City, Country\"</span>",
               nocoverage: "Sorry, we do not have detailed maps for your property location. <br><br>Use your mouse to drag the marker as close as possible to the correct location on the map. If needed, use the '+' and '-' buttons to zoom. <br><br><strong>You must move the marker to continue or click 'Start Over'</strong>",
            /* General Text */
          instructiontext: "To keep our sites free from fraudulent listings, each property address is reviewed internally to ensure accuracy and validity. Your address will not be displayed anywhere on the site.",
             introduction: "Enter your full vacation rental address (No PO Boxes)",
                   boaden: "We're unable to find this address. <span>Please broaden your details. Try using \"City, State\" or \"City, Country\"</span>",
               movemarker: "Use your mouse to drag the marker to the correct location on the map. If needed, use the '+' and '-' buttons to zoom and find your exact property location. <br><br><strong>You must move the marker to continue or click 'Start Over'</strong>",
             movecontinue: "Click 'Continue' if the marker is now correct on the map. If not, continue to drag the marker to the correct location and then select 'Continue'.",
              exactheader: "Is this your exact address?",
             confirmexact: "Yes, this is my exact address",
                 fixexact: "No, I need to correct my address",
             enteraddress: "Please enter your address",
                 haveunit: "Does your property have a unit number?",
                  country: "Country",
                  address: "Street Address",
                     unit: "Unit #",
                     city: "City",
                 province: "State/Province",
                   postal: "Postal Code",
            confirmmarker: "Please confirm the below",
             addressmatch: "The address and marker are correct",
               markermiss: "The address is correct, but the marker is in the wrong place",
         thankyouheadline: "Thank you!",
                 thankyou: "Saving...",
             reviewheader: "Please use the address input above"
        },
        fr:{ /* French */
             introduction: "Entrez votre adresse de vacances de la location",
             enteraddress: "S'il vous plaît, entrez votre adresse"
        },
        it:{ /* Italian */
             introduction: "Inserisci il tuo indirizzo completo per le vacanze, si prega di"
        },
        de:{ /* German */
             introduction: "Geben Sie Ihre vollständige Ferienwohnung Adresse, bitte"
        },
        nl:{ /* Dutch */
             introduction: "Voer uw volledige vakantie Adres van het pand"
        },
        pt:{ /* Portuguese */
             introduction: "Digite seu endereço de aluguer completo de férias, por favor"
        },
        es:{ /* Spanish */
             introduction: "Indica tu dirección completa Alquiler de vacaciones, por favor"
        }
    };
    if(window.haac === undefined) {
        window.haac = {
            lang:'en'
        };
    }
    if(window.haac.lang === undefined) {
        window.haac.lang = 'en';
    }
    if(window.haac.strings !== undefined) {
        tempstrings = $.extend(true, {}, strings, window.haac.strings);
    }else{
        tempstrings = $.extend(true, {}, strings);
    }
    window.haac.strings = $.extend(true, {}, tempstrings.en, tempstrings[window.haac.lang]);
    window.haac.langsets = tempstrings;
})(window, jQuery);(function(window, $, undefined){
    if($ !== undefined) {
        $.fn.invoke = function(target){
            if(typeof target === 'undefined' || target === false) return this;
            var data, handler;
            
            if(typeof target === 'object') {
                handler = target.handler;
                data = target.data;
            }else{
                handler = target;
            }
            
            if(typeof handler === 'undefined' || handler === false) return this;
            var tfunc = 'inv'+Math.random();
                tfunc = tfunc.replace(/\./,'');
            
            $.fn[tfunc] = handler;
            return this.each(function(){
                $(this)[tfunc](data);
            });
        };
    }
    
    var setInfoWindowContent;
    var flows;
    var haac = window.haac;
    var commons = {
        proceed:{
            html:'<div class="haac-button-row haacclearfix"><a href="#" class="haac-button"><span>'+haac.strings.proceed+'</span></a></div>'
        }
    };
    var screens = {
        collector:{
            html:'<div class="haac-address-input"><input type="text" name="homeawaygeo-address" id="homeawaygeo-address" placeholder="'+haac.strings.introduction+'"></div>'
        },
        unit:{
            html:'<h1>'+haac.strings.haveunit+'</h1>'
                +'<div class="haac-set"><div class="haac-row">'
                +'<input type="radio" id="hasunit" name="unit" value="yes"><label for="hasunit">'+haac.strings.yes+'</label> <input type="text" id="unitno" placeholder="'+haac.strings.unit+'">'
                +'</div><div class="haac-row">'
                +'<input type="radio" id="nounit" name="unit" value="no"><label for="nounit">'+haac.strings.no+'</label></div></div>'
                +commons.proceed.html,
            load:function(){
                var data = arguments[0];
                var self = $(this);
                $('#unitno').bind('focus', function(){
                    $(this).siblings('#hasunit')[0].checked = true;
                });
                $('.haac-button', self).bind('click', function(e){
                    e.preventDefault();
                    e.cancelBubble = true;
                    self.invoke({
                        handler:haac.screens.unit.complete,
                        data:data
                    });
                    return false;
                });
            },
            validation:function(self) {
                var valid = true;
                var validations = [];
                if(($('#unitno')[0].placeholder === '' || $('#unitno')[0].placeholder === undefined) || $.browser.msie) {
                    $('#unitno', self).each(function(){
                        var field = $(this);
                        if(field.val() === field.attr('placeholder')) field.val('');
                    });
                }

                if($('#hasunit')[0].checked === true && $('#unitno').val() === '') {
                    valid = false;
                    validations.push(haac.strings.validateunitrequired);
                }
                if($('#hasunit')[0].checked === false && $('#nounit')[0].checked === false) {
                    valid = false;
                    validations.push(haac.strings.validateunit);
                }
                
                if(($('#unitno')[0].placeholder === '' || $('#unitno')[0].placeholder === undefined) || $.browser.msie) {
                    $('#unitno', self).each(function(){
                        var field = $(this);
                        if(field.val() === '') field.val(field.attr('placeholder'));
                    });
                }

                return {valid:valid,validations:validations};
            },
            complete:function(){
                var validation = haac.screens.unit.validation($(this));
                
                if(validation.valid === false) {
                    return alert(validation.validations.join("\n"));
                }
                var self = $(this);
                var data = arguments[0];
                var address = window.haac.address;
                if(address !== null && $('#hasunit', self)[0].checked === true) address.unitnumber = $('#unitno', self).val();
                setInfoWindowContent(haac.screens.confirm, data);
                return self;
            }
        },
        confirm:{
            html:'<h1>'+haac.strings.confirmmarker+'</h1>'
                +'<p class="formatted"></p>'
                +'<div class="haac-set"><div class="haac-row">'
                +'<input type="radio" id="bothmatch" name="addressmatch" value="both"><label for="bothmatch">'+haac.strings.addressmatch+'</label></div>'
                +'<div class="haac-row">'
                +'<input type="radio" id="onlyaddress" name="addressmatch" value="address"><label for="onlyaddress">'+haac.strings.markermiss+'</label></div></div><br>'
                +'<p>'+haac.strings.privacyreminder+'</p>'
                +commons.proceed.html,
            load:function(){
                var self = $(this);
                var data = arguments[0];
                
                $('#bothmatch').bind('click', function(){
                    if(this.checked === true) {
                        $('.haac-button>span', self).text(haac.strings.save);
                    }
                });
                $('#onlyaddress').bind('click', function(){
                    if(this.checked === true) {
                        $('.haac-button>span', self).text(haac.strings.proceed);
                    }
                });
                
                $('.haac-button', self).bind('click', function(){
                    self.invoke({
                        handler:haac.screens.confirm.complete,
                        data:data
                    });
                    return false;
                });
            },
            validation:false,
            complete:function(){
                var self = $(this);
                var data = arguments[0];
                
                if($('#onlyaddress')[0].checked === true) {
                    setInfoWindowContent(haac.screens.onlymarker, data);
                    window.haac.getMarker().setDraggable(true);
                }else{
                    setInfoWindowContent(haac.screens.aftermanual, data);
                }
                return self;
            }
        },
        onlymarker:{
            html:function(){
                return window.haac.screens.move.html;
            },
            load:function(){
                window.haac.fixingMarker = true;
            }
        },
        confirmmove:{
            html:'<h1>'+haac.strings.exactheader+'</h1>'
                +'<p class="formatted"></p>'
                +'<div class="haac-set"><div class="haac-row">'
                +'<input type="radio" id="exactmatch" name="exactmatch" value="both"><label for="exactmatch">'+haac.strings.confirmexact+'</label></div>'
                +'<div class="haac-row">'
                +'<input type="radio" id="onlymarker" name="exactmatch" value="marker"><label for="onlymarker">'+haac.strings.fixexact+'</label></div></div>'
                +'<p></p>'
                +'<p></p>'
                +'<p></p>'
                +commons.proceed.html,
            validation:false,
            load:function(){
                var data = arguments[0];
                var self = $(this);
                $('.haac-button', self).bind('click', function(){
                    self.invoke({
                        handler:haac.screens.confirmmove.complete,
                        data:data
                    });
                    return false;
                });
            },
            complete:function(){
                var self = $(this);
                var data = arguments[0];
                if($('#onlymarker')[0].checked === true) {
                    setInfoWindowContent(haac.screens.manual, data);
                }else{
                    setInfoWindowContent(haac.screens.unit, data);
                }
                return self;
            }
        },
        manual:{
            html:'<div style="min-height:260px"><h1>'+haac.strings.haveunit+'</h1>'
                +'<div class="haac-set">'
                +'<div class="haac-row"><input type="radio" id="hasunit" name="hasunit" value="yes"><label for="hasunit">'+haac.strings.yes+'</label> <input type="radio" id="nounit" name="hasunit" value="no"><label for="nounit">'+haac.strings.no+'</label></div>'
                +'<div class="haac-row haac-unit-row" style="display:none"><label for="haac-unit"><input type="text" id="haac-unit" placeholder="'+haac.strings.unit+'"></label><br><br></div>'
                +'<h1>'+haac.strings.enteraddress+'</h1>'
                +'<div class="haac-row"><label for="haac-address"><input type="text" id="haac-address" placeholder="'+haac.strings.address+'" class="haac-textfield"></label></div>'
                +'<div class="haac-row"><label for="haac-city"><input type="text" id="haac-city" placeholder="'+haac.strings.city+'" class="haac-textfield"></label></div>'
                +'<div class="haac-row"><label for="haac-province"><input type="text" id="haac-province" placeholder="'+haac.strings.province+'" class="haac-textfield"></label></div>'
                +'<div class="haac-row"><label for="haac-country"><input type="hidden" id="haac-country" placeholder="'+haac.strings.country+'"></label></div>'
                +'<div class="haac-row"><label for="haac-postal"><input type="text" id="haac-postal" placeholder="'+haac.strings.postal+'" class="haac-textfield"></label></div></div>'
                +commons.proceed.html
                +'<p>&nbsp;</p></div>',
            load:function(){
                var self = $(this);
                var data = arguments[0];
                
                if(window.haac.country !== undefined) {
                    $('#haac-country', self).val(window.haac.country.short_name).parent().append($('<span></span>').text('Country: '+window.haac.country.long_name));
                    
                    if($.inArray(window.haac.country.short_name, window.haac.strings.nozipcountries) !== -1){
                        $('#haac-postal').parents('.haac-row').hide();
                    }
                }
                
                $('#hasunit, #nounit', self).bind('click', function(){
                    if(this.checked === true && this.value === 'yes') {
                        $('.haac-unit-row', self).show();
                        $('#haac-unit').trigger('focus').trigger('blur');
                    }else{
                        $('.haac-unit-row', self).hide();
                        $('#haac-unit').val('');
                    }
                });
                $('.haac-button', self).bind('click', function(){
                    self.invoke({
                        handler:haac.screens.manual.complete,
                        data:data
                    });
                    return false;
                });
            },
            validation:function(self){
                if(($('#haac-address')[0].placeholder === '' || $('#haac-address')[0].placeholder === undefined) || $.browser.msie) {
                    $('#haac-country, #haac-address, #haac-unit, #haac-city, #haac-province, #haac-postal', self).each(function(){
                        var field = $(this);
                        if(field.val() === field.attr('placeholder')) field.val('');
                    });
                }
                
                var valid = true;
                var validations = [];
                if($('#hasunit', self)[0].checked === false && $('#nounit', self)[0].checked === false) {
                    valid = false;
                    validations.push(haac.strings.validateunit);
                }
                if($('#haac-address', self).val() === '') {
                    valid = false;
                    validations.push(haac.strings.validateaddressrequired);
                }
                if($('#haac-city', self).val() === '') {
                    valid = false;
                    validations.push(haac.strings.validatecityrequired);
                }
                if($('#hasunit')[0].checked === true && $('#haac-unit').val() === '') {
                    valid = false;
                    validations.push(haac.strings.validateunitrequired);
                }

                if(window.haac.country !== undefined) {                    
                    if($.inArray(window.haac.country.short_name, window.haac.strings.nozipcountries) !== -1){
                        $('#haac-postal').parents('.haac-row').hide();
                    }
                }
                
                if(($('#haac-address')[0].placeholder === '' || $('#haac-address')[0].placeholder === undefined) || $.browser.msie) {
                    $('#haac-country, #haac-address, #haac-unit, #haac-city, #haac-province, #haac-postal', self).each(function(){
                        var field = $(this);
                        if(field.val() === '') field.val(field.attr('placeholder'));
                    });
                }

                return {valid:valid,validations:validations};
            },
            complete:function(){
                var self = $(this);
                var validation = haac.screens.manual.validation($(this));
                
                if(validation.valid === false) {
                    return alert(validation.validations.join("\n"));
                }
                
                $('#haac-country, #haac-address, #haac-unit, #haac-city, #haac-province, #haac-postal', self).each(function(){
                    var field = $(this);
                    if(field.val() === field.attr('placeholder')) field.val('');
                });
                
                var data = arguments[0];
                var useraddress = {};
                    useraddress.country = $('#haac-country').val();
                    useraddress.address = $('#haac-address').val();
                    useraddress.unit = $('#haac-unit').val();
                    useraddress.city = $('#haac-city').val();
                    useraddress.province = $('#haac-province').val();
                    useraddress.postal = $('#haac-postal').val();
                    useraddress.lat = haac.getMarker().getPosition().lat();
                    useraddress.lng = haac.getMarker().getPosition().lng();

                window.haac.useraddress = useraddress;
                setInfoWindowContent(haac.screens.aftermanual, data);
            }
        },
        aftermanual:{
            html:'<p>'+haac.strings.thankyou+'<p>',
            load:function(){
                window.haac.getInfoWindow().close();
                var data = arguments[0];

                window.haac.save();

                if(data.opts.saveonfinish) {
                    if(data.opts.savehandler !== 'undefined' && data.opts.savehandler !== undefined) data.opts.savehandler();
                }
            }
        },
        aftermove:{
            html:'<p>'+haac.strings.movecontinue+'</p>'
                +commons.proceed.html,
            load:function(){
                var data = arguments[0];
                var self = $(this);
                $('.haac-button', self).bind('click', function(){
                    self.invoke({
                        handler:haac.screens.aftermove.complete,
                        data:data
                    });
                    return false;
                });
                return self;
            },
            complete:function(){
                var data = arguments[0];
                var address = window.haac.address;
                if(address !== null) {
                    setInfoWindowContent(haac.screens.confirmmove, data);
                }else{
                    setInfoWindowContent(haac.screens.manual, data);
                }
            }
        },
        move:{
            html:'<p style="text-align:center; padding: 0 50px;">'+haac.strings.movemarker+'</p>'
        },
        nocovermove:{
            html:'<p style="text-align:center; padding: 0 20px;">'+haac.strings.nocoverage+'</p>'
        },
        review:{
            html:'<h1>'+haac.strings.reviewheader+'</h1>'
            +'<p>'+haac.strings.choosebest+'</p>'
            +'<div class="haac-set"><div class="haac-row">'
        }
    };

    setInfoWindowContent = function(target, data){
        var address = window.haac.address;
        var box = $('<div class="infowindow-content"></div>');
            $((typeof target.html === 'string') ? target.html : target.html()).appendTo(box);
        if(address !== null && typeof(address.formatted_address) !== 'undefined') {
            $('.formatted', box).text(address.formatted_address);
        }
        
        $(data.infowindow).data('loader', target.load||null);
        setTimeout(function(){
            data.infowindow.setContent(box[0]);
            return false;
        }, 150);
        return false;
    };

    if(window.haac === undefined) {
        window.haac = {};
    }
    
    flows = {
        happy:[screens.unit,screens.confirm,screens.aftermanual],
        unhappy:[screens.move,screens.aftermove],
        meh:[],
        currentflow:'happy',
        index:0
    };
    
    window.haac.screens = screens;
    window.haac.commons = commons;
    window.haac.flows = flows;
    window.haac.setInfoWindowContent = setInfoWindowContent;
})(window, jQuery);/**
 * jQuery HomeAway Address Collector Widget
 * Version: 0.1.0
 * URL: http://www.homeaway.com
 * Description: Self Contained Address Collection Widget
 * Requires: 1.4.1+.
 * Author: Aaron Upshaw (www.twitter.com/whizbangtx)
 */

/*global google haac*/

// Plugin closure wrapper
(function($, window, undefined) {
    //the real stuff
    var head,
        buildno = "120",
        opts,
        initialized,
        geocoder,
        collector,
        map,
        marker,
        infowindow,
        checkcoverage,
        streetaddress,
        getcountry,
        structuredaddress,
        getaddresscomponent,
        mapgeoresult,
        infodomready,
        dragend,
        vod_frame_callback,
        noticetext,
        startover;
        
    var nocoverage = ["Cyprus","Guyana","Israel","Kiribati","Maldives","Malta","North Korea","Palau","Suriname","Vanuata"];
        
    head = document.getElementsByTagName('head')[0];
    geocoder = new google.maps.Geocoder();
    initialized = false;

    infowindow = new google.maps.InfoWindow();
    
    // Main plugin function
    $.fn.homeawaygeo = function(options) {
        // Overwrite user options with plugin defaults
        opts = $.extend(true, {}, $.fn.homeawaygeo.defaults, options);
        if(!initialized && opts.injectcss === true) {
            var style = document.createElement('style');
                style.type = 'text/css';
                
            if(typeof style.styleSheet !== 'undefined'){
                style.styleSheet.cssText = opts.csstext.nodeValue;
            } else {
                style.appendChild(opts.csstext);
            }
            head.appendChild(style);
        }
        window.haac.save = opts.save;
        window.haac.load = opts.load;
        
        if(opts.savebutton) opts.savebutton.hide();
        
        // Iterate through DOM elements and work your magic
        return this.each(function() {
            var self = $(this);
                self.addClass('collector');
            $(window.haac.screens.collector.html).insertBefore(self).invoke(function(){
                collector = $('#homeawaygeo-address', this)
                    .autocomplete(opts.autocomplete)
                    .bind('keypress', function(e){
                        if(e.keyCode === 34 || e.keyCode === 13) return false;
                    });
                collector.data('autocomplete')._renderItem = opts.autocomplete.template;                
                
                // IE Placeholder polyfill
                if((collector[0].placeholder === '' || collector[0].placeholder === undefined) || $.browser.msie) {
                    $('input[placeholder]').live('focus', function(e){
                        if($(this).val() === $(this).attr('placeholder')) $(this).val('');
                    }).live('blur', function(e){
                        if($(this).val() === '') $(this).val($(this).attr('placeholder'));
                    });
                    
                    $('#homeawaygeo-address')[0].focus();
                    $('#homeawaygeo-address')[0].blur();

                }
                noticetext = $('<p></p>').text(window.haac.strings.instructiontext).insertBefore(collector.parent());
                startover = $('<a></a>').attr('href', '#').addClass('haac-startover').text(window.haac.strings.restart).insertAfter(collector.parent()).hide();
                startover.bind('click', function(){
                    window.haac.fixingMarker;
                    window.haac.address = null;
                    marker.setMap(null);
                    map.setCenter(new google.maps.LatLng(-0.7031073524364783, -0.703125));
                    map.setZoom(2);
                    noticetext.show();
                    $(this).hide();
                    $('#homeawaygeo-address').val('').autocomplete('enable').parent().show();
                    
                    return false;
                });
            });
            if(opts.map.css !== undefined) self.css(opts.map.css);
            map = new google.maps.Map(self[0], opts.map);
            
            if(opts.source) window.haac.load();
        }); // end return this.each

    }; // end $.fn.homeawaygeo

    // Default settings for the plugin
    $.fn.homeawaygeo.defaults = {
        map:{
            zoom:1,
            streetViewControl:false,
            mapTypeControl:true,
            scrollwheel:false,
            center:new google.maps.LatLng(30.290766,-97.759720),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        autocomplete:{
            autoFill:false,
            mustMatch:true,
            selectFirst:true,
            minLength:3,
            source:function(req, add, no_override, no_check){
                var suggestions = [];
                no_override = true;
                geocoder.geocode({'address':req.term}, function(results, status){
                    if(results.length > 0 ) suggestions.push({
                        label:'<div class="best-option">'+haac.strings.choosebest+'</div>',
                        value:req.term,
                        override:true
                    });
                    if(status === google.maps.GeocoderStatus.OK) {
                        $.each(results, function(key, result){
                            suggestions.push({
                                label:result.formatted_address,
                                value:result.formatted_address,
                                result:result
                            });
                        });
                    }
                    if(results.length === 0) {
                        suggestions.push({
                            label:'<div class="nomatch">'+haac.strings.boaden+'</div>',
                            value:req.term,
                            override:true
                        });
                    }
                    add(suggestions);
                });
            },
            select:function(event, ui){
                window.haac.fixingMarker = false;
                
                $(this).val(ui.item.value);
                
                $(this).autocomplete('disable').bind('keyup', function(){
                    $(this).autocomplete('enable');
                });
                $(this).blur();
                
                if(ui.item.override === true || typeof ui.item.result === 'undefined') {
                    $(this).autocomplete('enable').autocomplete('search');
                    return false;
                }
                $(this).parent().hide();                
                startover.show();
                noticetext.hide();
                
                opts.mapit(ui.item.result);
            },
            close:function(event, ui){
                var field = $(this);
                if(!field.autocomplete('option', 'disabled')) setTimeout(function(){
                    $(field.focus().data('autocomplete')).trigger('search');
                }, 150);
            },
            template:function(ul, item){
                return $('<li></li>').data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
            }
        },
        csstext:document.createTextNode('.haac-address-input{width:730px;border:1px solid #ccc;background:#fff;margin-bottom:10px;padding:0}.collector{width:738px;height:475px;visibility:hidden;position:absolute;font-size:13px!important}.haac-address-input input{border:0;width:100%;font-size:16px;-webkit-font-smoothing:antialiased;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box}.haac-address-input input:focus{outline:0}.haac-notice{padding-left:2px;font-size:13px;color:#999;font-style:italic}.infowindow-content h1{font-size:16px;margin-top:0;padding-top:0;display:block}.collector .infowindow-content h1{float:none!important}.infowindow-content{min-width:330px;max-width:480px;font-size:13px!important}.infowindow-content .haac-button-row{text-align:right;padding:.5em 0;width:100%;max-width:480px;padding-bottom:15px}.infowindow-content p{margin:0}.nomatch{font-size:1.4em;color:#c60000}.nomatch span{display:block;font-size:.72em;color:#333}.best-option{color:#333;border-bottom:1px dotted #d8d8d8}.best-option span{display:block}.haac-row input.haac-textfield{width:250px}.haac-button,a.haac-button{text-decoration:none;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-ms-border-radius:3px;border-radius:3px;background:#0d6cb6;color:#fff!important;font-weight:700;display:inline-block;zoom:1;padding:4px 15px;color:#fff;text-decoration:none}.haac-button span,a.haac-button span{color:#fff!important}.haac-button:hover{color:#fff;-moz-box-shadow:0 0 0 1px #000;-webkit-box-shadow:0 0 0 1px #000;-o-box-shadow:0 0 0 1px #000;-ms-box-shadow:0 0 0 1px #000;box-shadow:0 0 0 1px #000}.haac-startover{font-size:18px;font-weight:bold}.formatted{padding:.5em 0}.ui-helper-hidden{display:none}.ui-helper-hidden-accessible{position:absolute!important;clip:rect(1px,1px,1px,1px)}.ui-helper-reset{border:0;outline:0;line-height:1.3;text-decoration:none;font-size:100%;list-style:none;margin:0;padding:0}.ui-helper-clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.ui-helper-clearfix{display:block}* html .ui-helper-clearfix{height:1%}.ui-helper-zfix{width:100%;height:100%;top:0;left:0;position:absolute;opacity:0;filter:Alpha(Opacity=0)}.ui-widget .ui-widget{font-size:1em}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Trebuchet MS,Tahoma,Verdana,Arial,sans-serif;font-size:13px}.ui-widget-content{border:1px solid #ddd;background:#f0f7fe;color:#0d6cb6}.ui-widget-content a{color:#0d6cb6}.ui-widget-header{border:1px solid #e78f08;background:#f6a828;color:#fff;font-weight:700}.ui-autocomplete{position:absolute;cursor:default}.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default{border:1px solid #ccc;background:#f6f6f6;font-weight:700;color:#1c94c4}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited{color:#1c94c4;text-decoration:none}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus{background:#91cfee;font-weight:700;color:#0d6cb6}.ui-state-hover a,.ui-state-hover a:hover{color:#c77405;text-decoration:none}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active{border:1px solid #fbd850;background:#fff;font-weight:700;color:#eb8f00}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color:#eb8f00;text-decoration:none}.ui-widget :active{outline:0}.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{border:1px solid #fed22f;background:#ffe45c;color:#363636}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color:#363636}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{border:1px solid #cd0a0a;background:#b81900;color:#fff}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight:700}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{opacity:.7;filter:Alpha(Opacity=70);font-weight:400}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none}.ui-menu{list-style:none;display:block;float:left;border:1px solid #91cfee;border-top:1px solid transparent;margin:0;padding:0}.ui-menu .ui-menu{margin-top:-3px}.ui-menu .ui-menu-item{zoom:1;float:left;clear:left;width:100%;margin:0;padding:0}.ui-menu .ui-menu-item a{text-decoration:none;display:block;line-height:1.5;font-size:13px;zoom:1;padding:.2em 10px}.ui-menu .ui-menu-item a.ui-state-hover,.ui-menu .ui-menu-item a.ui-state-active{font-weight:400}.ui-menu-instruction{border-top:1px solid #91cfee;padding-top:4px;margin-top:4px;font-style:italic;font-weight:400;font-size:12px;color:#333}.ui-corner-all{-moz-border-radius:0;-webkit-border-radius:0;-o-border-radius:0;-ms-border-radius:0;border-radius:0;border:0}.ui-autocomplete{-moz-box-shadow:0 1px 4px 0 #2b4992;-webkit-box-shadow:0 1px 4px 0 #2b4992;-o-box-shadow:0 1px 4px 0 #2b4992;-ms-box-shadow:0 1px 4px 0 #2b4992;box-shadow:0 1px 4px 0 #2b4992}* html .ui-autocomplete{width:1px}.ui-widget-header a,.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a,.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color:#fff}.haacclearfix:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}.haacclearfix{display:inline-block}html[xmlns] .haacclearfix{display:block}* html .haacclearfix{height:1%};'),
        injectcss:true,
        mapit:function(result, mode){
            var happy;
            happy = streetaddress(result);
            
            //Show the map
            $(map.getDiv()).css({
                visibility:'visible',
                position:'relative'
            });
            
            marker = mapgeoresult(result, marker, happy);
            google.maps.event.addListener(marker, 'dragstart', function(){
                if(typeof infowindow !== 'undefined') infowindow.close();
            });
            google.maps.event.addListener(marker, 'click', function(){
                if(typeof infowindow !== 'undefined') infowindow.open(map, this);
            });
            google.maps.event.addListener(infowindow, 'closeclick', function(){
                var self = this;
                setTimeout(function(){self.open(map, marker);}, 1);
                return false;
            });
            
            window.haac.address = structuredaddress(result);
            window.haac.addressdirty = true;
            
            if(mode !== 'marker'){
                if(typeof(window.haac.useraddress) !== 'undefined') window.useraddress_dirty = true;
                if(!happy) {
                    if(checkcoverage(result) === true) {
                        window.haac.setInfoWindowContent(haac.screens.move, {
                            infowindow:infowindow,
                            map:map,
                            marker:marker
                        });
                    }else{
                        window.haac.setInfoWindowContent(haac.screens.nocovermove, {
                            infowindow:infowindow,
                            map:map,
                            marker:marker
                        });
                    }
                } else {
                    window.haac.setInfoWindowContent(haac.screens.unit, {
                        infowindow:infowindow,
                        map:map,
                        marker:marker
                    });
                }
            } else {
                window.haac.setInfoWindowContent(haac.screens.review, {
                    infowindow:infowindow,
                    map:map,
                    marker:marker
                });
            }
            google.maps.event.addListener(marker, 'dragend', dragend);
        },
        load:function(){
            var loadedaddress,
                initialmode,
                formatted;
                            
            collector.autocomplete('disable').bind('keyup', function(){
                $(this).autocomplete('enable');
            });
            
            formatted = (function(){
                if(typeof(opts.formatted) !== 'undefined') return opts.formatted.val();
                var str = '';
                var street = $(opts.source.street).val();
                var unit = $(opts.source.unit).val();
                var city = $(opts.source.city).val();
                var province = $(opts.source.province).val();
                var country = $(opts.source.country).val();
                var postalcode = $(opts.source.postalcode).val();
                
                if(street !== '') str+= street;
                if(unit !== '') str+= ' ' + unit;
                if(city !== '') str+= ', '+ city;
                if(province !== '') str+= ', '+ province;
                if(country !== '') str+= ', '+ country;
                if(postalcode !== '') str+= ' ' + postalcode;
                
                return str;
            })();
            loadedaddress = {
                formatted:formatted,
                address:$(opts.source.street).val(),
                unitnumber:$(opts.source.unit).val(),
                city:$(opts.source.city).val(),
                province:$(opts.source.province).val(),
                postal:$(opts.source.postalcode).val(),
                country:$(opts.source.country).val(),
                lat:$(opts.source.lat).val(),
                lng:$(opts.source.lng).val()
            };
            collector.val(loadedaddress.formatted);
            
            window.haac.loadedaddress = loadedaddress;
            initialmode = (typeof opts.initialmode !== 'undefined') ? opts.initialmode : 'marker';
            
            if($(opts.source.lat).val() !== ''){
                var revloc = {};
                revloc.location = new google.maps.LatLng($(opts.source.lat).val(), $(opts.source.lng).val());
                geocoder.geocode(revloc, function(results, status){
                    var result = false;
                    if(status === google.maps.GeocoderStatus.OK) {
                        $.each(results, function(key, tmpresult){
                            if(streetaddress(tmpresult) === true){
                                result = tmpresult;
                            }
                        });
                    }
                    if(results.length === 0) {
                        result = {
                            geometry:{
                                location:new google.maps.LatLng($(opts.source.lat).val(), $(opts.source.lng).val())
                            }
                        };
                    }
                    if(result !== false) opts.mapit(result, initialmode);
                    
                    collector.autocomplete('enable').autocomplete('search');
                });
            }else{
                collector.autocomplete('enable').autocomplete('search');
            }
        },
        save:function(){
            if(typeof opts.targets !== 'undefined'){
                var composedaddress;
                if(window.haac.address !== null && window.haac.useraddress === undefined) {
                    var address = window.haac.address;
                    var addressparts = address.address_components;
                    composedaddress = {
                        formatted:address.formatted_address,
                        street:'',
                        unit:address.unitnumber,
                        city:'',
                        province:'',
                        postalcode:'',
                        country:'',
                        lat:address.geometry.location.lat(),
                        lng:address.geometry.location.lng(),
                        olat:address.geometry.location.lat(),
                        olng:address.geometry.location.lng(),
                        precision:'ADDRESS'
                    };
                    for(var i=0;i<addressparts.length;i++) {
                        if($.inArray('street_number', addressparts[i].types) !== -1) {
                            composedaddress.street = addressparts[i].long_name;
                        }else
                        if($.inArray('route', addressparts[i].types) !== -1) {
                            composedaddress.street += ' ' + addressparts[i].long_name;
                        }else
                        if($.inArray('locality', addressparts[i].types) !== -1) {
                            composedaddress.city = addressparts[i].long_name;
                        }else
                        if($.inArray('administrative_area_level_1', addressparts[i].types) !== -1) {
                            composedaddress.province = (typeof addressparts[i].short_name !== 'undefined') ? addressparts[i].short_name : addressparts[i].long_name;
                        }else
                        if($.inArray('country', addressparts[i].types) !== -1) {
                            composedaddress.country = addressparts[i].short_name;
                        }else
                        if($.inArray('postal_code', addressparts[i].types) !== -1) {
                            composedaddress.postalcode = addressparts[i].long_name;
                        }
                    }
                }else if(typeof window.haac.useraddress !== 'undefined') {
                    var useraddress = window.haac.useraddress;
                    composedaddress = {
                        formatted:'',
                        street:useraddress.address,
                        unit:useraddress.unitnumber,
                        city:useraddress.city,
                        province:useraddress.province,
                        postalcode:useraddress.postal,
                        country:useraddress.country,
                        lat:useraddress.lat,
                        lng:useraddress.lng,
                        olat:useraddress.lat,
                        olng:useraddress.lng,
                        precision:'OWNERSEYE'
                    };
                }
                $.each(opts.targets, function(key, value){
                    $(value).val("");
                    $(value).val(composedaddress[key]);
                });
            }
        }
    };
    
    checkcoverage = function(google_geo_result){
        if(!google_geo_result) return false;
        var addressparts = google_geo_result.address_components;
        var country;
        for(var i=0;i<addressparts.length;i++) {
            if($.inArray('country', addressparts[i].types) !== -1) {
                country = addressparts[i].long_name;
            }
        }
        if($.inArray(country, nocoverage) === -1) {
            return true;
        }else{
            return false;
        }
    };
    
    getcountry = function(google_geo_result) {
        if(!google_geo_result) return false;
        var addressparts = google_geo_result.address_components;
        var country;
        for(var i=0;i<addressparts.length;i++) {
            if($.inArray('country', addressparts[i].types) !== -1) {
                country = addressparts[i];
            }
        }
        return country;
    };

    
    streetaddress = function(google_geo_result){
        if(!google_geo_result) return false;
        if((typeof(google_geo_result.types) !== 'undefined' && $.isArray(google_geo_result.types)) && $.inArray('street_address', google_geo_result.types) !== -1) return true;
        if((typeof(google_geo_result.types) !== 'undefined' && $.isArray(google_geo_result.types)) && $.inArray('route', google_geo_result.types) !== -1) return true;
        return false;
    };
    
    structuredaddress = function(google_geo_result){
        if(!google_geo_result) return false;
        var match = false;
        if($.isArray(google_geo_result)) {
            $.each(google_geo_result, function(index,item){
                if(streetaddress(item)) {
                    match = item;
                }
            });
        }else{
            if(streetaddress(google_geo_result)) {
                match = google_geo_result;
            }
        }
        if(match !== false) return match;
        return null;
    };
    
    getaddresscomponent = function(google_geo_result, type){
        if(!google_geo_result) return false;
        
        var addressparts = google_geo_result.address_components;
        
        for(var i=0;i<addressparts.length;i++) {
            if($.inArray(type, addressparts[i].types) !== -1) {
                return addressparts[i];
            }
        }
    };
    
    mapgeoresult = function(result, marker, happy) {
        if(typeof marker !== 'undefined') marker.setMap(null);
        var loc,
            startloc,
            _marker;
            
        loc = result.geometry.location;
        startloc = new google.maps.LatLng(loc.lat(), loc.lng());
        
        _marker = new google.maps.Marker({
            map:map,
            draggable:!happy,
            animation:google.maps.Animation.DROP,
            position:startloc
        });
        
        if(typeof result.geometry.viewport !== 'undefined') map.fitBounds(result.geometry.viewport);
        
        vod_frame_callback();
        return _marker;
    };
    
    dragend = function(){
        geocoder.geocode({'location':marker.getPosition()}, function(results, status){
            var address, tempaddress;
            tempaddress = structuredaddress(results);
            map.panTo(marker.getPosition());
            
            /* Strict level moving 
            if(tempaddress === null) return window.haac.setInfoWindowContent(haac.screens.move, {
                infowindow:infowindow,
                map:map,
                marker:marker
            });
            */
            // If we don't get a street address result then grab the first one
            if(tempaddress === null) tempaddress = results[0];

            if(window.haac.address !== null && window.haac.fixingMarker !== undefined && window.haac.fixingMarker === true) {
                address = window.haac.address;
                address.geometry = tempaddress.geometry;
            }else{
                address = structuredaddress(results);
            }
            window.haac.address = address;
            window.haac.country = getcountry((address === null) ? tempaddress : address);

            window.haac.setInfoWindowContent((window.haac.fixingMarker !== undefined && window.haac.fixingMarker === true) ? haac.screens.confirm : haac.screens.aftermove, {
                infowindow:infowindow,
                map:map,
                marker:marker
            });
        });
        return false;
    };
    
    infodomready = function(){
        this.open(map, marker);
        var _handler = $(this).data('loader');
        if(typeof _handler !== 'undefined' && _handler !== null) $(this.getContent()).invoke({
            handler:_handler,
            data:{
                map:map,
                infowindow:infowindow,
                marker:marker,
                opts:opts
            }
        });
        $(this).data('loader', null);
        
        if((collector[0].placeholder === '' || collector[0].placeholder === undefined) || $.browser.msie) {
            $('input[placeholder]').each(function(){
                var field = $(this);
                if(field.val() === '') field.val(field.attr('placeholder'));
            });
        }
    };
    
    vod_frame_callback = function(){
        setTimeout(function(){
            try {
                window.vod_iframe_resizer();
            }catch(e){
                // just catching to make sure no errors
            }
        }, 850);
    };
    
    google.maps.event.addListener(infowindow, 'content_changed', infodomready);
    window.haac.address = {};
    
    window.haac.getMap = function(){
        return map;
    };
    window.haac.getInfoWindow = function(){
        return infowindow;
    };
    window.haac.getMarker = function(){
        return marker;
    };
    window.haac.getAddressComponent = getaddresscomponent;
    
    window.haac.build = function(){
        return buildno;
    };
})(jQuery, window); // end closure wrapper