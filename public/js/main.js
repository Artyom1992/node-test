'use strict';

/*Табы*/
if ($('.Tabs').length) {
	var a = 5;

	$('.Tabs__captions').on('click', '.Tabs__caption:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active').closest('.Tabs').children('.Tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});
}
/*~Табы*/