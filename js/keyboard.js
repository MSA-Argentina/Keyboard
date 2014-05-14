(function($){
        
        var destiny;
        var container;

        //Keyboard layouts
        var av_layouts = {
            "qwerty": [
                ['1 2 3 4 5 6 7 8 9 0'],
                ['Q W E R T Y U I O P'],
                ['A S D F G H J K L Ñ'],
                ['Z X C V B N M {bksp}' ],
                ['{space} {next}' ],
            ],
            "num": [
                ['1 2 3'],
                ['4 5 6'],
                ['7 8 9'],
                ['0 {bksp} {accept}']
            ]
        };
        //Button templates
        var keyBtn = jQuery('<div></div>')
                .addClass('ui-keyboard-button')
                .addClass('ui-state-default');
        var actionKey = keyBtn.clone()
                .addClass('ui-keyboard-actionkey');

        $.fn.keyboard = function() {
            //Behavior for the inputs
            this.addClass("text");
            this.focusin(function(){
                destiny = $(this);
                if(typeof(destiny.next("input.text").attr("id")) != "undefined"){
                    $('div.ui-keyboard-accept')
                           .text('Siguiente')
                           .addClass('ui-keyboard-next')
                           .removeClass('ui-keyboard-accept');
                } else {
                    $('div.ui-keyboard-next')
                           .text('Aceptar')
                           .addClass('ui-keyboard-accept')
                           .removeClass('ui-keyboard-next');
                }
            });
        };

        $.fn.build_keyboard = function(options){
            container = this;
            destiny = jQuery("input.text:first").attr("id");

            var settings = $.extend({
            // These are the defaults.
            layout: "qwerty"
            }, options );

            for( row in av_layouts[settings.layout] ){
                currentRow = av_layouts[settings.layout][row];
                newRow = jQuery('<div></div>')
                    .attr('id','keyboard-row'+row)
                    .addClass('keyboard-row')
                    .appendTo(container);

                for( set in currentRow ){
                    newSet = jQuery('<div></div>')
                        .addClass('ui-keyboard-keyset')
                        .appendTo(newRow);
                    currentSet = currentRow[set];
                    keys = currentSet.split(/\s+/);
                    for( key in keys ){
                        //if it's an action key
                        if( /^{\S+}$/.test(keys[key])){
                            action = keys[key].match(/^{(\S+)}$/)[1];
                            switch(action){
                                case "space":
                                    actionKey.clone()
                                        .text('Espacio')
                                        .addClass('ui-keyboard-space')
                                        .click(function(){
                                            destiny.val(destiny.val() + ' ');
                                            destiny.focus();
                                        })
                                    .appendTo(newSet);
                                    break;
                                case "bksp":
                                    actionKey.clone()
                                        .attr('name','key_bksp')
                                        .text('Borrar')
                                        .addClass('ui-keyboard-bksp')
                                        .click(function(){
                                            destiny.val(destiny.val()
                                                .substring(0,destiny.val().length - 1));
                                            destiny.focus();
                                        })
                                        .appendTo(newSet);
                                    break;
                                case "accept":
                                    actionKey.clone()
                                        .text('Aceptar')
                                        .addClass('ui-keyboard-accept')
                                        .appendTo(newSet);
                                    break;
                                case "next":
                                    actionKey.clone()
                                        .text('Siguiente')
                                        .addClass('ui-keyboard-next')
                                        .click(function(){
                                            destiny = destiny.next("input.text");
                                            destiny.focus();
                                        })
                                        .appendTo(newSet);
                                    break;
                            }
                        } else {
                            keyBtn.clone()
                                .text(keys[key])
                                .click(function(){
                                    destiny.val(destiny.val() + $(this).text());
                                    destiny.focus();
                                })
                            .appendTo(newSet);
                        }
                    }
                }
            }
        }
})(jQuery);
