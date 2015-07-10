
app.directive('categoriaGaleria', [function () {
	return {
		restrict: 'A',
		link: function (scope, element, iAttrs) {
			var el = $(element);
			var top = $('#gal-top');
			var bottom = $('#gal-bottom');
			var overflow = el.find('.overflow');

			var globalH;
			var current_part = 0;

			top.hide();

			bottom.on('click', function(event) {
				var height = overflow.height();

				var itemHeight = $($('.item')[0]).height();
				var itemMarginBottom = parseFloat($($('.item')[0]).css("margin-bottom"));
				var sumHeight = (itemHeight+itemMarginBottom)*6;
				console.log(sumHeight);
				globalH = height;
				current_part++;

				el.animate({scrollTop: current_part*sumHeight }, 1000);
				console.log(current_part);
				var parts = height / sumHeight;
				var parts = Math.round(parts - 0.3);
				console.log(parts);
				if (parts == current_part) {
					top.show();
					bottom.hide();
				}
			});

			top.on('click', function(event) {
				var height = overflow.height();

				var itemHeight = $($('.item')[0]).height();
				var itemMarginBottom = parseFloat($($('.item')[0]).css("margin-bottom"));
				var sumHeight = (itemHeight+itemMarginBottom)*6;
				console.log(sumHeight);
				globalH = height;
				current_part--;
				el.animate({scrollTop: current_part*sumHeight }, 1000);
				console.log(current_part);
				var parts = height / sumHeight;
				var parts = Math.round(parts);
				console.log(parts);
				if (0 == current_part) {
					top.hide();
					bottom.show();
				}
			});

			
			// $(element)
		}
	};
}]);