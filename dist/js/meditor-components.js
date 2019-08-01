/*! MEditor v2.0.0 | Copyright (c) 2016-present Manu (http://manu.ws) */
!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("jQuery"),require("MEditor"));else if("function"==typeof define&&define.amd)define(["jQuery","MEditor"],t);else{var o="object"==typeof exports?t(require("jQuery"),require("MEditor")):t(n.jQuery,n.MEditor);for(var e in o)("object"==typeof exports?exports:n)[e]=o[e]}}("undefined"!=typeof self?self:this,function(n,t){return function(n){var t={};function o(e){if(t[e])return t[e].exports;var i=t[e]={i:e,l:!1,exports:{}};return n[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=n,o.c=t,o.d=function(n,t,e){o.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)o.d(e,i,function(t){return n[t]}.bind(null,i));return e},o.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(t,"a",t),t},o.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},o.p="",o(o.s=5)}([function(t,o){t.exports=n},function(n,o){n.exports=t},,function(n,t,o){},,function(n,t,o){"use strict";o.r(t);var e=o(0),i=o.n(e),r=o(1),a=o.n(r);a.a.components.photo={init:function(n,t,o,e){o.children(".meditor-component-content").find("img").css("display","inline-block")},settingEnabled:!0,settingTitle:"Photo Settings",initSettingForm:function(n,t){var o=this,e=t.options;n.append('<form class="form-horizontal">   <div class="form-group">       <div class="col-sm-12">           <button type="button" class="btn btn-block btn-primary" id="photo-edit">Change Photo</button>           <input type="file" style="display: none" />       </div>   </div>   <div class="form-group">       <label for="photo-align" class="col-sm-12">Align</label>       <div class="col-sm-12">           <select id="photo-align" class="form-control">               <option value="left">Left</option>               <option value="center">Center</option>               <option value="right">Right</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-style" class="col-sm-12">Style</label>       <div class="col-sm-12">           <select id="photo-style" class="form-control">               <option value="">None</option>               <option value="img-rounded">Rounded</option>               <option value="img-circle">Circle</option>               <option value="img-thumbnail">Thumbnail</option>           </select>       </div>   </div>   <div class="form-group">       <label for="photo-responsive" class="col-sm-12">Responsive</label>       <div class="col-sm-12">           <input type="checkbox" id="photo-responsive" />       </div>   </div>   <div class="form-group">       <label for="photo-width" class="col-sm-12">Width</label>       <div class="col-sm-12">           <input type="number" id="photo-width" class="form-control" />       </div>   </div>   <div class="form-group">       <label for="photo-height" class="col-sm-12">Height</label>       <div class="col-sm-12">           <input type="number" id="photo-height" class="form-control" />       </div>   </div></form>');var i=n.find("#photo-edit"),r=i.next();i.on("click",function(n){n.preventDefault(),r.trigger("click")}),r.on("change",function(){var n=this.files[0];if(/image/.test(n.type)){var o=new FileReader;o.addEventListener("load",function(n){var o=t.getSettingComponent().find("img");o.attr("src",n.target.result),o.css({width:"",height:""}),o.load(function(){t.showSettingPanel(t.getSettingComponent(),e)})}),o.readAsDataURL(this.files[0])}else alert("Your selected file is not photo!")}),n.find("#photo-align").on("change",function(){t.getSettingComponent().find(".photo-panel").css("text-align",this.value)}),n.find("#photo-responsive").on("click",function(){t.getSettingComponent().find("img")[this.checked?"addClass":"removeClass"]("img-responsive")}),n.find("#photo-style").on("change",function(){var n=t.getSettingComponent().find("img"),o=this.value;n.removeClass("img-rounded img-circle img-thumbnail"),o&&n.addClass(o)});var a=n.find("#photo-width"),l=n.find("#photo-height");a.on("change",function(){var n=t.getSettingComponent().find("img"),e=+this.value,i=Math.round(e/o.ratio);e<=0&&(e=o.width,i=o.height,this.value=e),n.css({width:e,height:i}),l.val(i)}),l.on("change",function(){var n=t.getSettingComponent().find("img"),e=+this.value,i=Math.round(e*o.ratio);e<=0&&(i=o.width,e=o.height,this.value=e),n.css({height:e,width:i}),a.val(i)})},showSettingForm:function(n,t,o){var e=this,r=n.find("#photo-align"),a=n.find("#photo-responsive"),l=n.find("#photo-width"),d=n.find("#photo-height"),c=n.find("#photo-style"),s=t.find(".photo-panel"),p=s.find("img"),m=s.css("text-align");"right"===m&&"center"===m||(m="left"),p.hasClass("img-rounded")?c.val("img-rounded"):p.hasClass("img-circle")?c.val("img-circle"):p.hasClass("img-thumbnail")?c.val("img-thumbnail"):c.val(""),r.val(m),a.prop("checked",p.hasClass("img-responsive")),l.val(p.width()),d.val(p.height()),i()("<img />").attr("src",p.attr("src")).load(function(){e.ratio=this.width/this.height,e.width=this.width,e.height=this.height})}};o(3);var l={};a.a.components.text={options:{toolbarGroups:[{name:"document",groups:["mode","document","doctools"]},{name:"editing",groups:["find","selection","spellchecker","editing"]},{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi","paragraph"]},{name:"links",groups:["links"]},{name:"insert",groups:["insert"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"styles",groups:["styles"]},{name:"colors",groups:["colors"]}],title:!1,allowedContent:!0,bodyId:"editor",templates_replaceContent:!1,enterMode:"P",forceEnterMode:!0,format_tags:"p;h1;h2;h3;h4;h5;h6",removePlugins:"table,magicline,tableselection,tabletools,div",removeButtons:"Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor",minimumChangeMilliseconds:100},initCKEditor:function(n,t){if(n.iframeWindow.CKEDITOR)t(n.iframeWindow.CKEDITOR);else{var o=$(document.body).find('[data-type="ckeditor-script"]').attr("src"),e=n.iframeDoc[0].createElement("script");e.type="text/javascript",e.src=o,e.onreadystatechange=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},e.onload=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},n.iframeHead.append(e),setTimeout(function(){e.src=o},500)}},init:function(n,t,o,e){var i=this,r=e.options,a=o.children(".meditor-component-content");a.prop("contenteditable",!0),a.on("input",function(i){"function"==typeof r.onComponentChanged&&r.onComponentChanged.call(n,i,o),"function"==typeof r.onContainerChanged&&r.onContainerChanged.call(n,i,t),"function"==typeof r.onContentChanged&&r.onContentChanged.call(e,i,n)}),i.initCKEditor(e,function(t){var e=t.inline(a[0],i.options);l[a.attr("id")]=e,e.on("instanceReady",function(){"function"==typeof r.onComponentReady&&r.onComponentReady.call(n,o,e)})})},getContent:function(n,t){var o=n.find(".meditor-component-content"),e=o.attr("id"),i=l[e];return i?i.getData():o.html()},destroy:function(n,t){var o=n.find(".meditor-component-content").attr("id");l[o]&&l[o].destroy()}},a.a.components.divider={init:function(n,t,o,e){},settingEnabled:!0,settingTitle:"Divider Settings",initSettingForm:function(n,t){n.append('\n            <form class="form-horizontal">\n                <div class="form-group">\n                    <label for="padding-top" class="col-sm-12">Padding top (px)</label>\n                    <div class="col-sm-4">\n                        <input type="text" class="padding-top form-control" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="padding-bottom" class="col-sm-12">Padding bottom (px)</label>\n                    <div class="col-sm-4">\n                        <input type="text" class="padding-bottom form-control" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="border-top-style" class="col-sm-12">Border Top Style</label>\n                    <div class="col-sm-12">\n                        <select id="border-top-style" class="form-control">\n                            <option value="none">None</option>\n                            <option value="solid">Solid</option>\n                            <option value="dashed">Dashed</option>\n                            <option value="dotted">Dotted</option>\n                            <option value="double">Double</option>\n                            <option value="groove">Groove</option>\n                            <option value="ridge">Ridge</option>\n                            <option value="inset">Inset</option>\n                            <option value="outset">Outset</option>\n                        </select>\n                    </div>\n                </div>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="border-top-color" class="col-sm-12">Border Top Color</label>\n                    <div class="col-sm-4">\n                        <input type="text" id="colorpicker" class="border-top-color form-control"/>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="border-top-width" class="col-sm-12">Border Top Width (px)</label>\n                    <div class="col-sm-4">\n                        <input type="string" class="border-top-width form-control" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="divider-background" class="col-sm-12">Background Color</label>\n                    <div class="col-sm-12">\n                        <input type="text" id="background-colorpicker" class="divider-background form-control" />\n                    </div>\n                </div>\n            </form>\n        '),i()("#colorpicker").spectrum({color:"#f00",showInput:!0,preferredFormat:"hex"}),i()("#background-colorpicker").spectrum({color:"#f00",showInput:!0,preferredFormat:"hex"}),n.find("#border-top-style").on("change",function(){t.getSettingComponent().find(".mcnDividerContent")[0].style.borderTopStyle=this.value,"none"!==this.value?i()("#colorpicker").spectrum("enable"):i()("#colorpicker").spectrum("disable")}),n.find(".border-top-color").on("change",function(n){t.getSettingComponent().find(".mcnDividerContent")[0].style.borderTopColor="#"+i()("#colorpicker").spectrum("get").toHex()}),n.find(".border-top-width").on("change",function(){t.getSettingComponent().find(".mcnDividerContent")[0].style.borderTopWidth=this.value}),n.find(".divider-background").on("change",function(){t.getSettingComponent().find(".mcnDividerBlock").css("background-color","#"+i()("#background-colorpicker").spectrum("get").toHex())}),n.find(".padding-top").on("change",function(){t.getSettingComponent().find(".mcnDividerBlockInner").css("padding-top",this.value)}),n.find(".padding-bottom").on("change",function(){t.getSettingComponent().find(".mcnDividerBlockInner").css("padding-bottom",this.value)})},showSettingForm:function(n,t,o){for(var e=t.find(".mcnDividerContent"),r=t.find(".mcnDividerBlockInner"),a=t.find(".mcnDividerBlock"),l=n.find("#border-top-style"),d=0;d<l[0].options.length;d++)if(0===e[0].style.borderTopStyle.length&&(e[0].style.borderTopStyle="none"),l[0].options[d].value===e[0].style.borderTopStyle){l[0].options[d].selected=!0;break}"none"===e[0].style.borderTopStyle&&i()("#colorpicker").spectrum("disable");n.find(".border-top-color");i()("#colorpicker").spectrum("set",e[0].style.borderTopColor),n.find(".border-top-width").val(e[0].style.borderTopWidth),n.find(".padding-top").val(r.css("padding-top")),n.find(".padding-bottom").val(r.css("padding-bottom"));n.find(".divider-background");i()("#background-colorpicker").spectrum("set",a.css("background-color"))}};var d={};a.a.components["email-button"]={options:{toolbarGroups:[{name:"basicstyles",groups:["basicstyles"]},{name:"styles",groups:["styles"]},{name:"colors",groups:["colors"]},{name:"links",groups:["links"]}],title:!1,allowedContent:!0,bodyId:"editor",templates_replaceContent:!1,enterMode:"P",forceEnterMode:!0,format_tags:"p;h1;h2;h3;h4;h5;h6",removePlugins:"table,magicline,tableselection,tabletools,div,contextmenu,liststyle",removeButtons:"Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor",minimumChangeMilliseconds:100},init:function(n,t,o,e){var i=this,r=e.options,a=o.children(".meditor-component-content");a.prop("contenteditable",!0),a.on("input",function(i){"function"==typeof r.onComponentChanged&&r.onComponentChanged.call(n,i,o),"function"==typeof r.onContainerChanged&&r.onContainerChanged.call(n,i,t),"function"==typeof r.onContentChanged&&r.onContentChanged.call(e,i,n)}),i.initCKEditor(e,function(t){var e=t.inline(a[0],i.options);d[a.attr("id")]=e,e.on("instanceReady",function(){"function"==typeof r.onComponentReady&&r.onComponentReady.call(n,o,e)})})},initCKEditor:function(n,t){if(n.iframeWindow.CKEDITOR)t(n.iframeWindow.CKEDITOR);else{var o=i()(document.body).find('[data-type="ckeditor-script"]').attr("src"),e=n.iframeDoc[0].createElement("script");e.type="text/javascript",e.src=o,e.onreadystatechange=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},e.onload=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},n.iframeHead.append(e),setTimeout(function(){e.src=o},500)}},settingEnabled:!0,settingTitle:"Button Settings",initSettingForm:function(n,t){n.append('\n            <form class="form-horizontal">\n                <div class="form-group">\n                    <label for="button-border" class="col-sm-12">Border Style</label>\n                    <div class="col-sm-12">\n                        <select id="border-style" class="btn-border-style form-control">\n                            <option value="none">None</option>\n                            <option value="solid">Solid</option>\n                            <option value="dashed">Dashed</option>\n                            <option value="dotted">Dotted</option>\n                            <option value="double">Double</option>\n                            <option value="groove">Groove</option>\n                            <option value="ridge">Ridge</option>\n                            <option value="inset">Inset</option>\n                            <option value="outset">Outset</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="button-border-background" class="col-sm-12">Background</label>\n                    <div class="col-sm-12">\n                        <input type="text" class="btn-background form-control" id="background-color" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="button-border-width" class="col-sm-12">Border Width</label>\n                    <div class="col-sm-4">\n                        <input type="text" class="btn-border-width form-control" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="button-border-color" class="col-sm-12">Border Color</label>\n                    <div class="col-sm-12">\n                        <input type="text" id="border-color" class="btn-border-color form-control" />\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="button-align" class="col-sm-12">Align</label>\n                    <div class="col-sm-12">\n                        <select id="btn-align" class="btn-align form-control">\n                            <option value="left">Left</option>\n                            <option value="center">Center</option>\n                            <option value="right">Right</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="button-border-radius" class="col-sm-12">Rounded Corner</label>\n                    <div class="col-sm-12" style="margin: 1px;">\n                        <div id="rounded-corners" class="col-sm-10 rnd-crn" style="margin-left: 10px;"> </div>\n                    </div>\n                </div>\n            </form>\n        '),i()(function(){i()("#rounded-corners").slider({classes:{"ui-slider":"highlight"},max:100,min:0,step:1})}),i()("#border-color").spectrum({color:"#f00",showInput:!0,preferredFormat:"hex"}),i()("#background-color").spectrum({color:"#f00",showInput:!0,preferredFormat:"hex"}),n.find("#border-style").on("change",function(){t.getSettingComponent().find(".mcnButtonContentContainer").css("border-style",this.value),"none"!==this.value?i()("#border-color").spectrum("enable"):i()("#border-color").spectrum("disable")}),n.find(".btn-background").on("change",function(){t.getSettingComponent().find(".mcnButtonContentContainer").css("background-color","#"+i()("#background-color").spectrum("get").toHex())}),n.find("#rounded-corners").on("slide",function(){t.getSettingComponent().find(".mcnButtonContentContainer").css("border-radius",i()("#rounded-corners").slider("values",0))}),n.find(".btn-align").on("change",function(){t.getSettingComponent().find(".mcnButtonBlockInner")[0].align=this.value}),n.find(".btn-border-width").on("change",function(){t.getSettingComponent().find(".mcnButtonContentContainer").css("border-width",this.value)}),n.find(".btn-border-color").on("change",function(){t.getSettingComponent().find(".mcnButtonContentContainer").css("border-color",this.value)})},getContent:function(n,t){var o=n.find(".meditor-component-content"),e=o.attr("id"),i=d[e];return i?i.getData():o.html()},destroy:function(n,t){var o=n.find(".meditor-component-content").attr("id");d[o]&&d[o].destroy()},showSettingForm:function(n,t,o){t.find(".mcnButton");for(var e=t.find(".mcnButtonContentContainer"),r=t.find(".mcnButtonBlockInner"),a=n.find("#border-style"),l=0;l<a[0].options.length;l++)if(0===e[0].style.borderStyle.length&&(e[0].style.borderStyle="none"),a[0].options[l].value===e[0].style.borderStyle){a[0].options[l].selected=!0;break}i()("#background-color").spectrum("set",e.css("background-color"));var d=e.css("border-radius");d=(""+d).endsWith("px")?d.substring(0,d.length-2):d,i()("#rounded-corners").slider("value",d),n.find(".btn-border-width").val(e.css("border-width")),"none"===e[0].style.borderStyle&&i()("#border-color").spectrum("disable"),i()("#border-color").spectrum("set",e.css("border-color"));var c=n.find(".btn-align");for(l=0;l<c[0].options.length;l++)if(c[0].options[l].value===r[0].align){c[0].options[l].selected=!0;break}}};var c={};a.a.components["email-image-caption"]={options:{toolbarGroups:[{name:"document",groups:["mode","document","doctools"]},{name:"editing",groups:["find","selection","spellchecker","editing"]},{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi","paragraph"]},{name:"links",groups:["links"]},{name:"insert",groups:["insert"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"styles",groups:["styles"]},{name:"colors",groups:["colors"]}],title:!1,allowedContent:!0,bodyId:"editor",templates_replaceContent:!1,enterMode:"P",forceEnterMode:!0,format_tags:"p;h1;h2;h3;h4;h5;h6",removePlugins:"table,magicline,tableselection,tabletools,div,contextmenu,liststyle",removeButtons:"Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor",minimumChangeMilliseconds:100},initCKEditor:function(n,t){if(n.iframeWindow.CKEDITOR)t(n.iframeWindow.CKEDITOR);else{var o=i()(document.body).find('[data-type="ckeditor-script"]').attr("src"),e=n.iframeDoc[0].createElement("script");e.type="text/javascript",e.src=o,e.onreadystatechange=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},e.onload=function(){n.iframeWindow.CKEDITOR.disableAutoInline=!0,t(n.iframeWindow.CKEDITOR)},n.iframeHead.append(e),setTimeout(function(){e.src=o},500)}},init:function(n,t,o,e){var i=this,r=e.options,a=o.children(".meditor-component-content");a.prop("contenteditable",!0),a.on("input",function(i){"function"==typeof r.onComponentChanged&&r.onComponentChanged.call(n,i,o),"function"==typeof r.onContainerChanged&&r.onContainerChanged.call(n,i,t),"function"==typeof r.onContentChanged&&r.onContentChanged.call(e,i,n)}),i.initCKEditor(e,function(t){var e=t.inline(a[0],i.options);c[a.attr("id")]=e,e.on("instanceReady",function(){"function"==typeof r.onComponentReady&&r.onComponentReady.call(n,o,e)})})},settingEnabled:!0,settingTitle:"Image + Caption Settings",initSettingForm:function(n,t){n.append('\n            <form class="form-horizontal">\n                <div class="form-group">\n                    <label for="caption-position" class="col-sm-12">Caption Position</label>\n                    <div class="col-sm-12">\n                        <input type="text" class="caption-position form-control" />\n                    </div>\n                </div>\n\n                <div class="form-group">\n                    <label for="caption-position" class="col-sm-12">Number of Images</label>\n                    <div class="col-sm-12">\n                        <input type="text" class="image-count form-control" />\n                    </div>\n                </div>\n            </form>\n        '),n.find(".image-count").on("change",function(){var n=t.getSettingComponent().find(".mcnCaptionTopContent"),o=t.getSettingComponent().find(".mcnCaptionBottomContent"),e=t.getSettingComponent().find(".mcnCaptionBlockInner"),i=(t.getSettingComponent().find(".mcnCaptionTopImageContent"),t.getSettingComponent().find(".mcnCaptionBottomImageContent"),t.getSettingComponent().find(".mcnTextContent"));if(2==e[0].children.length&&1==this.value){for(;e[0].children.length>1;)e[0].children[e[0].children.length-1].remove();n=t.getSettingComponent().find(".mcnCaptionTopContent"),(o=t.getSettingComponent().find(".mcnCaptionBottomContent"))[0]&&(o[0].width=564),n[0]&&(n[0].width=564),i[0].width=564}else if(1==e[0].children.length&&2==this.value){var r=e[0].children[0].cloneNode(!0);e[0].appendChild(r);for(var a=0;a<e[0].children.length;a++)e[0].children[a].width="282";e[0].children[0].align="left",e[0].children.length>1&&(e[0].children[1].align="right")}}),n.find(".caption-position").on("change",function(){var n=t.getSettingComponent().find(".mcnCaptionTopContent"),o=t.getSettingComponent().find(".mcnCaptionTopImageContent"),e=t.getSettingComponent().find(".mcnCaptionBottomImageContent"),r=t.getSettingComponent().find(".mcnTextContent"),a=t.getSettingComponent().find(".mcnCaptionBlockInner"),l=t.getSettingComponent().find(".mcnCaptionBottomContent");if("Bottom"===this.value){var d,c,s=t.getSettingComponent().find(".mcnTextContent")[0].parentNode.cloneNode(!0),p=t.getSettingComponent().find(".mcnCaptionTopImageContent")[0].parentNode.cloneNode(!0);t.getSettingComponent().find(".mcnTextContent").length>1&&(c=t.getSettingComponent().find(".mcnTextContent")[1].parentNode.cloneNode(!0)),t.getSettingComponent().find(".mcnCaptionTopImageContent").length>1&&(d=t.getSettingComponent().find(".mcnCaptionTopImageContent")[1].parentNode.cloneNode(!0));for(var m=0;m<n.length;m++)for(;n[m].children.length>0;)o[0].parentNode.remove(),r[0].parentNode.remove(),n[m].children.length>0&&n[m].children[0].remove();n[0].appendChild(p),n[0].appendChild(s),d&&n[1].appendChild(d),c&&n[1].appendChild(c);for(var g=0;g<n.length;g++)n[g].className="mcnCaptionBottomContent",(o=t.getSettingComponent().find(".mcnCaptionTopImageContent"))[0].className="mcnCaptionBottomImageContent";a[0].children[0].align="left",a[0].children.length>1&&(a[0].children[1].align="right"),n=t.getSettingComponent().find(".mcnCaptionTopContent"),l=t.getSettingComponent().find(".mcnCaptionBottomContent")}else if("Top"===this.value){var u,f,h=t.getSettingComponent().find(".mcnTextContent")[0].parentNode.cloneNode(!0),v=t.getSettingComponent().find(".mcnCaptionBottomImageContent")[0].parentNode.cloneNode(!0);t.getSettingComponent().find(".mcnTextContent").length>1&&(u=t.getSettingComponent().find(".mcnTextContent")[1].parentNode.cloneNode(!0)),t.getSettingComponent().find(".mcnCaptionBottomImageContent").length>1&&(f=t.getSettingComponent().find(".mcnCaptionBottomImageContent")[1].parentNode.cloneNode(!0));for(var C=0;C<l.length;C++)for(;l[C].children.length>0;)e[0].parentNode.remove(),r[0].parentNode.remove(),l[C].children.length>0&&l[C].children[0].remove();l[0].appendChild(h),l[0].appendChild(v),u&&l[1].appendChild(u),f&&l[1].appendChild(f);for(var b=0;b<l.length;b++)l[b].className="mcnCaptionTopContent",(o=t.getSettingComponent().find(".mcnCaptionBottomImageContent"))[0].className="mcnCaptionTopImageContent";a[0].children[0].align="left",a[0].children.length>1&&(a[0].children[1].align="right"),n=t.getSettingComponent().find(".mcnCaptionTopContent"),l=t.getSettingComponent().find(".mcnCaptionBottomContent")}else"Left"===this.value&&(i()(".mcnCaptionTopContent").each(function(){var n=i()(this),t=[];n.find("tr").each(function(){var n=0;i()(this).find("td").each(function(){void 0===t[++n]&&(t[n]=i()("<tr></tr>")),t[n].append(i()(this))})}),n.find("tr").remove(),i.a.each(t,function(){n.append(this)})}),i()(".mcnCaptionBottomContent").each(function(){var n=i()(this),t=[];n.find("tr").each(function(){var n=0;i()(this).find("td").each(function(){void 0===t[++n]&&(t[n]=i()("<tr></tr>")),t[n].append(i()(this))})}),n.find("tr").remove(),i.a.each(t,function(){n.append(this)})}))})},showSettingForm:function(n,t,o){var e=t.find(".mcnCaptionTopContent"),i=t.find(".mcnCaptionBottomContent"),r=0,a=n.find(".caption-position");e.length>0?(r=e.length,a.val("Top")):i.length>0&&(r=i.length,a.val("Bottom")),n.find(".image-count").val(r)},getContent:function(n,t){var o=n.find(".meditor-component-content"),e=o.attr("id"),i=c[e];return i?i.getData():o.html()},destroy:function(n,t){var o=n.find(".meditor-component-content").attr("id");c[o]&&c[o].destroy()}}}])});
//# sourceMappingURL=meditor-components.js.map