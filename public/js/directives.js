
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


app.directive('loadExcel', [function () {
	return {
		restrict: 'A',
		link: function (scope, el, iAttrs) {
			$(el).click(function(event) {
				$('input[load-excel-input]').trigger('click');
			});
		}
	};
}]);


app.directive('loadExcelInput', [function () {
	return {
		restrict: 'A',
		link: function (scope, el, iAttrs) {
			// console.log(el);
			$(el).change(function(event) {
				event.preventDefault();
				var file = $(this)[0].files[0];
				var data = new FormData();
				data.append('file',file);
				$.ajax({
					url: '/path/to/file',
					type: 'default GET (Other values: POST)',
					dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
					processData: false,
					data: data,
					before: function(){

					},
					success: function(){

					}

				});
				
				
			});
		}
	};
}])