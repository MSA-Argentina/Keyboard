(function($){
    $.fn.extend({

        keyboard: function() {
            this.addClass("text");
            this.focusin(function(){
                $("#keyboard").attr("data-target", $(this).attr("id"));
            });
        },


        build_keyboard: function(){
            var container = this;
            container.attr("id","keyboard");
            if(this.attr("data-target") == undefined){
                var destiny = jQuery("input.text:first").attr("id");
                this.attr("data-target", destiny);
            }
            var layouts = {
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
            var keyBtn = jQuery('<input />')
                    .attr('type','button')
                    .addClass('ui-keyboard-button')
                    .addClass('ui-state-default');
            var actionKey = keyBtn.clone()
                    .addClass('ui-keyboard-actionkey');

            for( row in layouts['qwerty'] ){
                currentRow = layouts['qwerty'][row];
                newRow = jQuery('<div></div>')
                    .attr('id','keyboard-row'+row)
                    .addClass('keyboard-row')
                    .appendTo(container);

                for( set in currentRow ){
                    newSet = jQuery('<div></div>')
                        .addClass('ui-keyboard-keyset')
                        .appendTo(newRow);
                    if(set==1){
                        //Support for modifiers
                        newSet
                            .addClass('ui-keyboard-shiftset')
                            .hide();
                    }
                    currentSet = currentRow[set];
                    keys = currentSet.split(/\s+/);
                    for( key in keys ){
                        //if it's an action key
                        if( /^{\S+}$/.test(keys[key])){
                            action = keys[key].match(/^{(\S+)}$/)[1];
                            switch(action){
                                case "space":
                                    actionKey.clone()
                                        .attr('name','key_space')
                                        .val('Space')
                                        .addClass('ui-keyboard-space')
                                        .click(function(){
                                            destiny = $("#" + container.attr("data-target"));
                                            destiny.val( 
                                                destiny.val() + ' ');
                                            destiny.focus();
                                        })
                                    .appendTo(newSet);
                                    break;
                                case "bksp":
                                    actionKey.clone()
                                        .attr('name','key_bksp')
                                        .val('Borrar')
                                        .addClass('ui-keyboard-bksp')
                                        .click(function(){
                                            destiny = $("#" + container.attr("data-target"));
                                            destiny.val(
                                                destiny.val().substring(0,destiny.val().length - 1));
                                            destiny.focus();
                                        })
                                    .appendTo(newSet);
                                    break;
                                case "accept":
                                    actionKey.clone()
                                        .attr('name','key_accept')
                                        .val('Aceptar')
                                        .addClass('ui-keyboard-accept')
                                    .appendTo(newSet);
                                    break;
                                case "next":
                                    actionKey.clone()
                                        .attr('name','key_next')
                                        .val('Siguiente')
                                        .addClass('ui-keyboard-next')
                                        .click(function(){
                                            destiny = $("#" + container.attr("data-target"));
                                            if(typeof(destiny.next("input.text").attr("id")) == "undefined"){
                                               $(this).attr('name','key_accept')
                                                    .attr('value','Aceptar')
                                                    .removeClass('ui-keyboard-next')
                                                    .addClass('ui-keyboard-accept');
                                            } else {
                                                destiny = destiny.next("input.text");
                                                container.attr("data-target", destiny.attr("id"));
                                                destiny.focus();
                                            }
                                        })
                                    .appendTo(newSet);
                                    break;
                            }
                        } else {
                            keyBtn.clone()
                                .attr('name','key_'+row+'_'+key)
                                .val(keys[key])
                                .click(function(){
                                    destiny = $("#" + container.attr("data-target"));
                                    destiny.val(destiny.val() + this.value);
                                    destiny.focus();
                                })
                                .appendTo(newSet);
                        }
                    }
                }
            }
        }

    });
})(jQuery);
