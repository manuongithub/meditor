import '../styles/meditor-component-text.less';
import MEditor from 'meditor';
const instances = {};

// Text component
// ---------------------------------------------------------------------
MEditor.components['text'] = {
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
        removePlugins: 'table,magicline,tableselection,tabletools,div',
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
