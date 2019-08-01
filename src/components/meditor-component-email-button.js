import $ from 'jquery';
import MEditor from 'meditor';

const instances = {};

MEditor.components['email-button'] = {
    options: {
        toolbarGroups: [
            {name: 'basicstyles', groups: ['basicstyles']},
            {name: 'styles', groups: ['styles']},
            {name: 'colors', groups: ['colors']},
            {name: 'links', groups: ['links']},
        ],
        title: false,
        allowedContent: true, // DISABLES Advanced Content Filter. This is so templates with classes: allowed through
        bodyId: 'editor',
        templates_replaceContent: false,
        enterMode: 'P',
        forceEnterMode: true,
        format_tags: 'p;h1;h2;h3;h4;h5;h6',
        removePlugins: 'table,magicline,tableselection,tabletools,div,contextmenu,liststyle',
        removeButtons: 'Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor',
        minimumChangeMilliseconds: 100
    },

    init: function (contentArea, container, component, meditor) {
        let self = this;
        let options = meditor.options;
        
        let componentContent = component.children('.meditor-component-content');
        componentContent.prop('contenteditable', true);
        
        componentContent.on('input', function (e) {
            if (typeof options.onComponentChanged === 'function') {
                options.onComponentChanged.call(contentArea, e, component);
            }
            
            if (typeof options.onContainerChanged === 'function') {
                options.onContainerChanged.call(contentArea, e, container);
            }
            
            if (typeof options.onContentChanged === 'function') {
                options.onContentChanged.call(meditor, e, contentArea);
            }
        });
        
        self.initCKEditor(meditor, function (ckeditor) {
            let editor = ckeditor.inline(componentContent[0], self.options);
            instances[componentContent.attr('id')] = editor;
            editor.on('instanceReady', function () {
                if (typeof options.onComponentReady === 'function') {
                    options.onComponentReady.call(contentArea, component, editor);
                }
            });
        });
    },

    initCKEditor: function (meditor, callback) {
        if (meditor.iframeWindow.CKEDITOR) {
            callback(meditor.iframeWindow.CKEDITOR);
        } else {
            let ckeditorSrc = $(document.body).find('[data-type="ckeditor-script"]').attr('src');
            let ckeditorScript = meditor.iframeDoc[0].createElement('script');
            ckeditorScript.type = 'text/javascript';
            ckeditorScript.src = ckeditorSrc;
            ckeditorScript.onreadystatechange = function () {
                meditor.iframeWindow.CKEDITOR.disableAutoInline = true;
                callback(meditor.iframeWindow.CKEDITOR);
            };
            ckeditorScript.onload = function () {
                meditor.iframeWindow.CKEDITOR.disableAutoInline = true;
                callback(meditor.iframeWindow.CKEDITOR);
            };
            meditor.iframeHead.append(ckeditorScript);
            
            setTimeout(() => {
                ckeditorScript.src = ckeditorSrc;
            }, 500);
        }
    },
    
    settingEnabled: true,
    
    settingTitle: 'Button Settings',
    
    initSettingForm: function (form, meditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="button-border" class="col-sm-12">Border Style</label>
                    <div class="col-sm-12">
                        <select id="border-style" class="btn-border-style form-control">
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
                <div class="form-group">
                    <label for="button-border-background" class="col-sm-12">Background</label>
                    <div class="col-sm-12">
                        <input type="text" class="btn-background form-control" id="background-color" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="button-border-width" class="col-sm-12">Border Width</label>
                    <div class="col-sm-4">
                        <input type="text" class="btn-border-width form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="button-border-color" class="col-sm-12">Border Color</label>
                    <div class="col-sm-12">
                        <input type="text" id="border-color" class="btn-border-color form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="button-align" class="col-sm-12">Align</label>
                    <div class="col-sm-12">
                        <select id="btn-align" class="btn-align form-control">
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="button-border-radius" class="col-sm-12">Rounded Corner</label>
                    <div class="col-sm-12" style="margin: 1px;">
                        <div id="rounded-corners" class="col-sm-10 rnd-crn" style="margin-left: 10px;"> </div>
                    </div>
                </div>
            </form>
        `);

        $( function() {
            $( "#rounded-corners" ).slider({
                classes: {
                    "ui-slider": "highlight"
                },
                max: 100,
                min: 0,
                step: 1
            });
        } );

        
        $("#border-color").spectrum({
            color: "#f00",
            showInput: true,
            preferredFormat: "hex"
        });

        $("#background-color").spectrum({
            color: "#f00",
            showInput: true,
            preferredFormat: "hex"
        });
        
        let borderStyle = form.find('#border-style');
        borderStyle.on('change', function() {
            let button_content_container = meditor.getSettingComponent().find('.mcnButtonContentContainer');
            button_content_container.css('border-style', this.value);
            if (this.value !== "none") {
                $("#border-color").spectrum("enable");
            } else {
                $("#border-color").spectrum("disable");
            }
        });

        let buttonBackgroundColor = form.find('.btn-background');
        buttonBackgroundColor.on('change', function() {
            let button_content_container = meditor.getSettingComponent().find('.mcnButtonContentContainer');
            button_content_container.css('background-color', "#"+$("#background-color").spectrum("get").toHex());
        });


        let roundedCorner = form.find('#rounded-corners');
        roundedCorner.on('slide', function() {
            let button_content_container = meditor.getSettingComponent().find('.mcnButtonContentContainer');
            button_content_container.css('border-radius', $( "#rounded-corners" ).slider( "values", 0 ));
        } );

        let buttonAlign = form.find('.btn-align');
        buttonAlign.on('change', function() {
            let button_content_inner = meditor.getSettingComponent().find('.mcnButtonBlockInner');
            button_content_inner[0].align = this.value;
        });

        let buttonBorderWidth = form.find('.btn-border-width');
        buttonBorderWidth.on('change', function() {
            let button_content_container = meditor.getSettingComponent().find('.mcnButtonContentContainer');
            button_content_container.css('border-width', this.value);
        });

        let buttonBorderColor = form.find('.btn-border-color');
        buttonBorderColor.on('change', function() {
            let button_content_container = meditor.getSettingComponent().find('.mcnButtonContentContainer');
            button_content_container.css('border-color', this.value);
        });

    },

    getContent: function (component, meditor) {
        let componentContent = component.find('.meditor-component-content');
        let id = componentContent.attr('id');
        let editor = instances[id];
        if (editor) {
            return editor.getData();
        } else {
            return componentContent.html();
        }
    },
    
    destroy: function (component, meditor) {
        let id = component.find('.meditor-component-content').attr('id');
        instances[id] && instances[id].destroy();
    },
    
    showSettingForm: function (form, component, meditor) {
        let button = component.find('.mcnButton');
        let button_container = component.find('.mcnButtonContentContainer');
        let button_block_inner = component.find('.mcnButtonBlockInner');
        
        let borderTopStyle = form.find('#border-style');

        for ( var i = 0; i < borderTopStyle[0].options.length; i++ ) {
            if (button_container[0].style.borderStyle.length === 0) {
                button_container[0].style.borderStyle = "none";
            }
            if ( borderTopStyle[0].options[i].value === button_container[0].style.borderStyle) {
                borderTopStyle[0].options[i].selected = true;
                break;
            }
        }
        $("#background-color").spectrum("set", button_container.css('background-color'));

        //let buttonBorderRadius = form.find('.btn-border-radius');
        //buttonBorderRadius.val(button_container.css('border-radius'));
        let current_val = button_container.css('border-radius');
        current_val = (''+current_val).endsWith("px") ? current_val.substring(0, current_val.length - 2) : current_val;
        $( "#rounded-corners" ).slider( "value", current_val);

        let buttonBorderWidth = form.find('.btn-border-width');
        buttonBorderWidth.val(button_container.css('border-width'));

        if (button_container[0].style.borderStyle === "none") {
            $("#border-color").spectrum("disable");
        }
        $("#border-color").spectrum("set", button_container.css('border-color'));

        let buttonAlign = form.find('.btn-align');

        for ( var i = 0; i < buttonAlign[0].options.length; i++ ) {
            if ( buttonAlign[0].options[i].value === button_block_inner[0].align) {
                buttonAlign[0].options[i].selected = true;
                break;
            }
        }

    }
};
