define(['backbone.ui.resizable','backbone','jquery','backbone.ui.draggable'], function(Resizable, Backbone, $, Draggable) {

	var ModifiedResizable = Backbone.View.extend(Resizable.prototype).extend(Draggable.prototype).extend({

		initialize: function(options) {
			Draggable.prototype.initialize.call(this, options);
			Resizable.prototype.initialize.call(this, options);
		},

		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		draggableOptions: {
			axis: 'y',
		},

		map: _.extend({}, Resizable.prototype.map, {
			'.position-top': 'top',
			'.position-left': 'left',

			'.height': 'height',
			'.width': 'width',

			'.->css:opacity': 'opacity',
		}),

		model: new Backbone.Model({
			top: 200,
			left: 600,

			width: 100,
			height: 70,

			opacity: 0.5,
		})
	});


	window.resizable = new ModifiedResizable({
		el: $('#resizable')
	});

});