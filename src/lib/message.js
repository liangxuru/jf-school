var template = {
	success: function(message){
		return '<div class="message-box-error">\(^o^)/ {message}</div>'.replace("{message}", message);
	},
	error: function(message){
		return '<div class="message-box-error">╯﹏╰ {message}</div>'.replace("{message}", message);
	}
};

function position(node){
	node.css({
		"margin-left": -node.outerWidth() / 2 + "px",
		"margin-top": (-node.outerHeight() / 2 + 50) + "px"
	});
}

export default {
	success: function(message){
		var node = $(template.success(message)).appendTo(document.body);

		position(node);

		setTimeout(function(){
			node.addClass("message-box-hide");
			setTimeout(function(){
				node.remove();
			}, 300);
		}, 2000);
	},
	error: function(message){
		var node = $(template.error(message)).appendTo(document.body);

		position(node);

		setTimeout(function(){
			node.addClass("message-box-hide");
			setTimeout(function(){
				node.remove();
			}, 1000);
		}, 1000);
	}
};