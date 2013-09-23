define(['backbone.modelview','jquery','backbone','underscore','jquery.ui.resizable'],
function(ModelView          , $      , Backbone , undef      , undef               ) {

	var Resizable = ModelView.extend({

		initialize: function(options) {

			_.bindAll(this,'_handleResize','_handleResizeStart','_handleResizeStop');
			_.bindAll(this,'handleResize','handleResizeStart','handleResizeStop');

			this.resizableOptions = _.extend(this.resizableOptions, options.resizableOptions);

			this.$resizable = options.resizable || this.$el;
			this.$resizable
				.resizable(this.resizableOptions)
				.on('resize', this._handleResize)
				.on('resizestart', this._handleResizeStart)
				.on('resizestop', this._handleResizeStop);


			/**
			 * Build the modelview map object: extend the original map object
			 */
			this.map = _.extend({}, this.map, {
				'.->css:top': this.dataMap.top,
				'.->css:left': this.dataMap.left,

				'.->css:width': this.dataMap.width,
				'.->css:height': this.dataMap.height,
			});

			ModelView.prototype.initialize.call(this, options);
		},

		_handleResize: function(e, ui) {
			var map = this.dataMap,
				set = {};

			// positions
			set[ map.top ] = ui.position.top;
			set[ map.left ] = ui.position.left;
			set[ map.originalTop ] = ui.originalPosition.top;
			set[ map.originalLeft ] = ui.originalPosition.left;

			// sizes
			set[ map.width ] = ui.size.width;
			set[ map.height ] = ui.size.height;
			set[ map.originalWidth ] = ui.originalSize.width;
			set[ map.originalHeight ] = ui.originalSize.height;

			this.model.set(set);

			this.handleResize(e, ui);
		},

		_handleResizeStart: function(e, ui) {

		},

		_handleResizeStop: function(e, ui) {

		},

		dataMap: {
			originalLeft: 'originalLeft',
			originalTop: 'originalTop',

			originalWidth: 'originalWidth',
			originalHeight: 'originalHeight',

			left: 'left',
			top: 'top',

			width: 'width',
			height: 'height',

		},

		/**
		 * Overwrite
		 */
		resizableOptions: {},

		handleResize: function(e, ui) {},
		handleResizeStart: function(e, ui) {},
		handleResizeStop: function(e, ui) {},
	});

	return Resizable;
});