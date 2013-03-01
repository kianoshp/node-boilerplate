(function() {

  define(['underscore'], function(_) {
    return _.extend(JST, {
      initialPage: '\
      			<div><%= message %></div>\
			'
    });
  });

}).call(this);