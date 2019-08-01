import MEditor from 'meditor';
import $ from 'jquery';

const instances = {};

MEditor.components['email-image-caption'] = {
    options: {
        toolbarGroups: [
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
            {name: 'links', groups: ['links']},
            {name: 'insert', groups: ['insert']},
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'styles', groups: ['styles']},
            {name: 'colors', groups: ['colors']},
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
    
    settingEnabled: true,
    
    settingTitle: 'Image + Caption Settings',
    
    initSettingForm: function (form, meditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="caption-position" class="col-sm-12">Caption Position</label>
                    <div class="col-sm-12">
                        <input type="text" class="caption-position form-control" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="caption-position" class="col-sm-12">Number of Images</label>
                    <div class="col-sm-12">
                        <input type="text" class="image-count form-control" />
                    </div>
                </div>
            </form>
        `);
        
        let imageCount = form.find('.image-count');
        imageCount.on('change', function() { 
            let caption_top = meditor.getSettingComponent().find('.mcnCaptionTopContent');
            let caption_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomContent');
            let caption_block_inner = meditor.getSettingComponent().find('.mcnCaptionBlockInner');
            let caption_image_content_top = meditor.getSettingComponent().find('.mcnCaptionTopImageContent');
            let caption_image_content_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomImageContent');
            let caption_text_content_bottom = meditor.getSettingComponent().find('.mcnTextContent');

            if (caption_block_inner[0].children.length == 2 && this.value == 1) {
                // delete one table inside 
                while(caption_block_inner[0].children.length > 1) {
                    caption_block_inner[0].children[caption_block_inner[0].children.length - 1].remove();
                }
                caption_top = meditor.getSettingComponent().find('.mcnCaptionTopContent');
                caption_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomContent');
                if (caption_bottom[0]) {
                    caption_bottom[0].width = 564;
                }
                if (caption_top[0]) {
                    caption_top[0].width = 564;
                }
                caption_text_content_bottom[0].width = 564;
            } else if (caption_block_inner[0].children.length == 1 && this.value == 2) {
                // add one table inside
                let image_table_clone = caption_block_inner[0].children[0].cloneNode(true);
                caption_block_inner[0].appendChild(image_table_clone);

                for (let i=0; i<caption_block_inner[0].children.length; i++) {
                    caption_block_inner[0].children[i].width = "282";
                }
                caption_block_inner[0].children[0].align = "left";
                if (caption_block_inner[0].children.length > 1) {
                    caption_block_inner[0].children[1].align = "right";
                }
            }
        });

        let captionPosition = form.find('.caption-position');
        captionPosition.on('change', function() {
            let caption_top = meditor.getSettingComponent().find('.mcnCaptionTopContent');
            let caption_image_content_top = meditor.getSettingComponent().find('.mcnCaptionTopImageContent');
            let caption_image_content_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomImageContent');
            let caption_text_content = meditor.getSettingComponent().find('.mcnTextContent');
            let caption_block_inner = meditor.getSettingComponent().find('.mcnCaptionBlockInner');
            let caption_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomContent');

            if (this.value === "Bottom") {
                // clone image and text nodes
                let caption_text_content_clone = meditor.getSettingComponent().find('.mcnTextContent')[0].parentNode.cloneNode(true);
                let caption_image_content_top_clone = meditor.getSettingComponent().find('.mcnCaptionTopImageContent')[0].parentNode.cloneNode(true); 
                let caption_image_content_top_clone_1,caption_text_content_clone_1;

                if (meditor.getSettingComponent().find('.mcnTextContent').length > 1) {
                    caption_text_content_clone_1 = meditor.getSettingComponent().find('.mcnTextContent')[1].parentNode.cloneNode(true);
                }
                if (meditor.getSettingComponent().find('.mcnCaptionTopImageContent').length > 1) {
                    caption_image_content_top_clone_1 = meditor.getSettingComponent().find('.mcnCaptionTopImageContent')[1].parentNode.cloneNode(true); 
                }
                for (let i=0; i<caption_top.length; i++) {
                    while (caption_top[i].children.length > 0) {
                        // delete image and text nodes
                        caption_image_content_top[0].parentNode.remove();
                        caption_text_content[0].parentNode.remove();
                        if (caption_top[i].children.length > 0) {
                            caption_top[i].children[0].remove();
                        }
                    }
                }
         
                // insert image first then text node
                caption_top[0].appendChild(caption_image_content_top_clone);
                caption_top[0].appendChild(caption_text_content_clone);
                if (caption_image_content_top_clone_1) {
                    caption_top[1].appendChild(caption_image_content_top_clone_1);
                }
                if (caption_text_content_clone_1) {
                    caption_top[1].appendChild(caption_text_content_clone_1);
                }

                for (let i=0; i<caption_top.length; i++) {
                    // swap class names
                    caption_top[i].className = "mcnCaptionBottomContent";
                    caption_image_content_top = meditor.getSettingComponent().find('.mcnCaptionTopImageContent');
                    caption_image_content_top[0].className = "mcnCaptionBottomImageContent";
                }

                caption_block_inner[0].children[0].align = "left";
                if (caption_block_inner[0].children.length > 1) {
                    caption_block_inner[0].children[1].align = "right";
                }
                caption_top = meditor.getSettingComponent().find('.mcnCaptionTopContent');
                caption_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomContent');

            } else if (this.value === "Top") {

                // clone image and text nodes
                let caption_text_content_clone = meditor.getSettingComponent().find('.mcnTextContent')[0].parentNode.cloneNode(true);
                let caption_image_content_bottom_clone = meditor.getSettingComponent().find('.mcnCaptionBottomImageContent')[0].parentNode.cloneNode(true); 
                let caption_text_content_clone_1, caption_image_content_bottom_clone_1;
                if (meditor.getSettingComponent().find('.mcnTextContent').length > 1) {
                    caption_text_content_clone_1 = meditor.getSettingComponent().find('.mcnTextContent')[1].parentNode.cloneNode(true);
                }
                if (meditor.getSettingComponent().find('.mcnCaptionBottomImageContent').length > 1) {
                    caption_image_content_bottom_clone_1 = meditor.getSettingComponent().find('.mcnCaptionBottomImageContent')[1].parentNode.cloneNode(true); 
                }
                for (let i=0; i<caption_bottom.length; i++) {
                    while (caption_bottom[i].children.length > 0) {
                        // delete image and text nodes
                        caption_image_content_bottom[0].parentNode.remove();
                        caption_text_content[0].parentNode.remove();
                        if (caption_bottom[i].children.length > 0) {
                            caption_bottom[i].children[0].remove();
                        }
                    }
                }
            
                // insert image first then text node
                caption_bottom[0].appendChild(caption_text_content_clone);
                caption_bottom[0].appendChild(caption_image_content_bottom_clone);
                if (caption_text_content_clone_1) {
                    caption_bottom[1].appendChild(caption_text_content_clone_1);
                }
                if (caption_image_content_bottom_clone_1) {
                    caption_bottom[1].appendChild(caption_image_content_bottom_clone_1);
                }
                
                for (let i=0; i<caption_bottom.length; i++) {
                    // swap class names
                    caption_bottom[i].className = "mcnCaptionTopContent";
                    caption_image_content_top = meditor.getSettingComponent().find('.mcnCaptionBottomImageContent');
                    caption_image_content_top[0].className = "mcnCaptionTopImageContent";
                }

                caption_block_inner[0].children[0].align = "left";
                if (caption_block_inner[0].children.length > 1) {
                    caption_block_inner[0].children[1].align = "right";
                }
                caption_top = meditor.getSettingComponent().find('.mcnCaptionTopContent');
                caption_bottom = meditor.getSettingComponent().find('.mcnCaptionBottomContent');
            } else if (this.value === "Left") {
                //mcnCaptionBlock
                $(".mcnCaptionTopContent").each(function() {
                    var $this = $(this);
                    var newrows = [];
                    $this.find("tr").each(function(){
                        var i = 0;
                        $(this).find("td").each(function(){
                            i++;
                            if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                            newrows[i].append($(this));
                        });
                    });
                    $this.find("tr").remove();
                    $.each(newrows, function(){
                        $this.append(this);
                    });
                });

                $(".mcnCaptionBottomContent").each(function() {
                    var $this = $(this);
                    var newrows = [];
                    $this.find("tr").each(function(){
                        var i = 0;
                        $(this).find("td").each(function(){
                            i++;
                            if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                            newrows[i].append($(this));
                        });
                    });
                    $this.find("tr").remove();
                    $.each(newrows, function(){
                        $this.append(this);
                    });
                });
            }
        });

    },
    
    showSettingForm: function (form, component, meditor) {
        let caption_top = component.find('.mcnCaptionTopContent');
        let caption_bottom = component.find('.mcnCaptionBottomContent');
        
        let imageCountInComponent = 0;

        let captionPosition = form.find('.caption-position');
        if (caption_top.length > 0) {
            imageCountInComponent = caption_top.length;
            captionPosition.val("Top");
        } else if (caption_bottom.length > 0) {
            imageCountInComponent = caption_bottom.length;
            captionPosition.val("Bottom");
        }

        let imageCount = form.find('.image-count');
        imageCount.val(imageCountInComponent);

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
    }
};
