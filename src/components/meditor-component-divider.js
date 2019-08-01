import $ from 'jquery';
import MEditor from 'meditor';

MEditor.components['divider'] = {
    init: function (contentArea, container, component, meditor) {
        
    },
    
    settingEnabled: true,
    
    settingTitle: 'Divider Settings',
    
    initSettingForm: function (form, meditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="padding-top" class="col-sm-12">Padding top (px)</label>
                    <div class="col-sm-4">
                        <input type="text" class="padding-top form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="padding-bottom" class="col-sm-12">Padding bottom (px)</label>
                    <div class="col-sm-4">
                        <input type="text" class="padding-bottom form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="border-top-style" class="col-sm-12">Border Top Style</label>
                    <div class="col-sm-12">
                        <select id="border-top-style" class="form-control">
                            <option value="none">None</option>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
                            <option value="groove">Groove</option>
                            <option value="ridge">Ridge</option>
                            <option value="inset">Inset</option>
                            <option value="outset">Outset</option>
                        </select>
                    </div>
                </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="border-top-color" class="col-sm-12">Border Top Color</label>
                    <div class="col-sm-4">
                        <input type="text" id="colorpicker" class="border-top-color form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="border-top-width" class="col-sm-12">Border Top Width (px)</label>
                    <div class="col-sm-4">
                        <input type="string" class="border-top-width form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="divider-background" class="col-sm-12">Background Color</label>
                    <div class="col-sm-12">
                        <input type="text" id="background-colorpicker" class="divider-background form-control" />
                    </div>
                </div>
            </form>
        `);

        $("#colorpicker").spectrum({
            color: "#f00",
            showInput: true,
            preferredFormat: "hex"
        });

        $("#background-colorpicker").spectrum({
            color: "#f00",
            showInput: true,
            preferredFormat: "hex"
        });
        
        let borderTopStyle = form.find('#border-top-style');
        borderTopStyle.on('change', function() {
            let divider = meditor.getSettingComponent().find('.mcnDividerContent');
            divider[0].style.borderTopStyle = this.value;
            if (this.value !== "none") {
                $("#colorpicker").spectrum("enable");
            } else {
                $("#colorpicker").spectrum("disable");
            }
        });

        let borderTopColor = form.find('.border-top-color');
        borderTopColor.on('change', function(color) {
            let divider = meditor.getSettingComponent().find('.mcnDividerContent');
            divider[0].style.borderTopColor = "#"+$("#colorpicker").spectrum("get").toHex();
        });

        let borderTopWidth = form.find('.border-top-width');
        borderTopWidth.on('change', function() {
            let divider = meditor.getSettingComponent().find('.mcnDividerContent');
            divider[0].style.borderTopWidth = this.value;
        });

        let dividerBackground = form.find('.divider-background');
        dividerBackground.on('change', function() {
            let divider = meditor.getSettingComponent().find('.mcnDividerBlock');
            divider.css('background-color', "#"+$("#background-colorpicker").spectrum("get").toHex());
        });

        let dividerPaddingTop = form.find('.padding-top');
        dividerPaddingTop.on('change', function() {
            let divider = meditor.getSettingComponent().find('.mcnDividerBlockInner');
            divider.css('padding-top', this.value);
        });

        let dividerPaddingBottom = form.find('.padding-bottom');
        dividerPaddingBottom.on('change', function() {
            let divider = meditor.getSettingComponent().find('.mcnDividerBlockInner');
            divider.css('padding-bottom', this.value);
        });

    },
    
    showSettingForm: function (form, component, meditor) {
        let divider = component.find('.mcnDividerContent');
        let divider_inner = component.find('.mcnDividerBlockInner');
        let divider_outer = component.find('.mcnDividerBlock');

        let borderTopStyle = form.find('#border-top-style');

        for ( var i = 0; i < borderTopStyle[0].options.length; i++ ) {
            if (divider[0].style.borderTopStyle.length === 0) {
                divider[0].style.borderTopStyle = "none";
            }

            if ( borderTopStyle[0].options[i].value === divider[0].style.borderTopStyle) {
                borderTopStyle[0].options[i].selected = true;
                break;
            }
        }
        if (divider[0].style.borderTopStyle === "none") {
            $("#colorpicker").spectrum("disable");
        }
        let borderTopColor = form.find('.border-top-color');
        $("#colorpicker").spectrum("set", divider[0].style.borderTopColor);

        let borderTopWidth = form.find('.border-top-width');
        borderTopWidth.val(divider[0].style.borderTopWidth);

        let paddingTop = form.find('.padding-top');
        paddingTop.val(divider_inner.css('padding-top'));

        let paddingBottom = form.find('.padding-bottom');
        paddingBottom.val(divider_inner.css('padding-bottom'));

        let dividerBackground = form.find('.divider-background');
        $("#background-colorpicker").spectrum("set", divider_outer.css('background-color'));
    }
};
