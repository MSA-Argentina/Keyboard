$.fn.keyboard = function() {
    var layouts: {
        "qwerty": [
            ['1 2 3 4 5 6 7 8 9 0 - = `',
            '! @ # $ % ^ & * ( ) _ + ~'],
            ['q w e r t y u i o p [ ] \\',
            'Q W E R T Y U I O P { } |'],
            ['{sp:.5} a s d f g h j k l ; \' {return}',
            '{sp:.5} A S D F G H J K L : " {return}'],
            ['{sp:1} z x c v b n m , . / {shift}',
            '{sp:1} Z X C V B N M < > ? {shift}' ],
            ['{accept} {space} {cancel} {bksp}',
            '{accept} {space} {cancel} {bksp}']
        ],
        "num": [
            ['1 2 3 {bksp}'],
            ['4 5 6 {accept}'],
            ['7 8 9 {cancel}'],
            ['0 {dec} {neg}']
        ]
    };

    this.options.layout = this.options.layout || "qwerty";
    this.layouts.custom = this.options.customLayout || [['{cancel}']];
    var ui = this; 
    var element = ui.element;
    var keyboard = this._buildKeyboard(ui);
    var allKeys = keyboard.find('.ui-keyboard-button');
    var inputKeys = allKeys.filter(':not(.ui-keyboard-actionkey)');
    var previewInput = keyboard.find('.ui-keyboard-preview');
    var decBtn = keyboard.find('[name=key_decimal]');

    jQuery('body').append(keyboard);

    _buildKeyboard: function(ui){
        var container = jQuery('<div></div>')
            .addClass('ui-keyboard')
            .addClass('ui-widget-content')
            .addClass('ui-widget')
            .hide();

        actionKey = keyBtn.clone()
            .addClass('ui-keyboard-actionkey');

        for( row in this.layouts[this.options.layout] ){
            currentRow = this.layouts[this.options.layout][row];
            newRow = jQuery('<div></div>')
                .attr('id','ui-keyboard-row'+row)
                .addClass('ui-keyboard-row')
                .appendTo(container);

            for( set in currentRow ){
                newSet = jQuery('<div></div>')
                    .addClass('ui-keyboard-keyset')
                    .appendTo(newRow);
                if(set==1){
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

                        if(action == 'space'){
                            actionKey.clone()
                                .attr('name','key_space')
                                .val('Space')
                                .addClass('ui-keyboard-space')
                                .click(function(){
                                    previewInput.val( 
                                        previewInput.val() + ' ');
                                })
                            .appendTo(newSet);
                        }else if(action == 'bksp'){
                            actionKey.clone()
                                .attr('name','key_bksp')
                                .val('<Bksp')
                                .click(function(){
                                    previewInput.val( 
                                        previewInput.val().substring(
                                            0,
                                            previewInput
                                            .val().length - 1
                                            )
                                        );
                                })
                            .appendTo(newSet);

                        }else if(action == 'shift'){
                            actionKey.clone()
                                .attr('name','key_shift')
                                .val('Shift')
                                .click(function(){
                                    hidden = container
                                    .find('.ui-keyboard-keyset:hidden');

                                .find('.ui-keyboard-keyset:visible');
                                visible.hide();
                                hidden.show();
                                })
                            .appendTo(newSet);
                        }else if(action == 'accept'){
                            actionKey.clone()
                                .attr('name','key_accept')
                                .val('Accept')
                                .addClass('ui-state-highlight')
                                .removeClass('ui-state-active')
                                .click(function(){
                                    ui.element.val( 
                                        previewInput.val()
                                        );
                                    container.hide();
                                })
                            .appendTo(newSet);
                        }else if(action == 'cancel'){
                            actionKey.clone()
                                .attr('name','key_cancel')
                                .val('Cancel')
                                .addClass('ui-state-highlight')
                                .removeClass('ui-state-active')
                                .click(function(){
                                    container.hide();
                                })
                            .appendTo(newSet);
                        }else if(/^sp:\.?\d+$/.test(action)){
                            margin = action.match(/^sp:(\.?\d+)$/)[1];
                            jQuery('<span>&nbsp;</span>')
                                .css('margin','0 ' + margin + 'em')
                                .appendTo(newSet);
                        }else if(action == "dec"){
                            keyBtn.clone()
                                .attr('name','key_decimal')
                                .val('.')
                                .appendTo(newSet);
                        }else if(action == "neg"){
                            actionKey.clone()
                                .attr('name','key_negative')
                                .val('+/-')
                                .click(function(){
                                    if(/^\-?\d*\.?\d*$/.test(
                                            previewInput.val()
                                            )){
                                                previewInput.val( 
                                                    (previewInput.val() * -1)
                                                    );
                                            }
                                })
                            .appendTo(newSet);
                        }else if(action == "return"){
                            actionKey.clone()
                                .attr('name','key_return')
                                .val('Return')
                                .click(function(){
                                    previewInput.val( 
                                        previewInput.val() + ' \n'
                                        );
                                })
                            .appendTo(newSet);
                        }
                    }else{
                        keyBtn.clone()
                            .attr('name','key_'+row+'_'+key)
                            .val(keys[key])
                            .appendTo(newSet);
                    }
                }

            }

        }

        return container;
    }
}
