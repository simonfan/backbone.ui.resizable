define(['backbone.modelview','jquery','backbone','underscore','jquery.ui.resizable'],
function(ModelView          , $      , Backbone , undef      , undef               ) {

	var Resizable = ModelView.extend({

		initialize: function(options) {
			_.bindAll(this,'handleResize','handleResizeStart','handleResizeStop');

			this.resizableOptions = _.extend(this.resizableOptions, options.resizableOptions);

			this.$resizable = options.resizable || this.$el;
			this.$resizable
				.resizable(this.resizableOptions)
				.on('resize', this.handleResize)
				.on('resizestart', this.handleResizeStart)
				.on('resizestop', this.handleResizeStop);

			ModelView.prototype.initialize.call(this, options);
		},

		map: {
			'.->css:top': 'top',
			'.->css:left': 'left',

			'.->css:width': 'width',
			'.->css:height': 'height',
		},
		
		/**
		 * Overwrite
		 */
		resizableOptions: {},


		handleResize: function(e, ui) {
			this.model.set({
				top: ui.position.top,
				left: ui.position.left,

				originalTop: ui.originalPosition.top,
				originalLeft: ui.originalPosition.left,

				width: ui.size.width,
				height: ui.size.height,

				originalWidth: ui.originalSize.width,
				originalHeight: ui.originalSize.height,
			});
		},
		handleResizeStart: function(e, ui) {},
		handleResizeStop: function(e, ui) {},
	});

	return Resizable;
});