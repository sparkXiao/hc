(function($) {
    $.fn.textfill = function(maxFontSize) {
    	
    	console.log('maxFontSize  '+maxFontSize);
    	
        maxFontSize = parseInt(maxFontSize, 10);
        
        console.log('cal maxFontSize  '+maxFontSize);
        
        return this.each(function(){
        	
            var ourText = $("p", this),
                parent = ourText.parent(),
                maxHeight = parent.height(),
                maxWidth = parent.width(),
                fontSize = parseInt(ourText.css("fontSize"), 10),
                multiplier = maxWidth/ourText.width(),
                newSize = (fontSize*(multiplier-0.1));
                
                console.log('maxHeight  '+ maxHeight + ' maxWidth '+ maxWidth)
                
            ourText.css(
                "fontSize", 
                (maxFontSize > 0 && newSize > maxFontSize) ? 
                    maxFontSize : 
                    newSize
            );
        });
    };
})(jQuery);