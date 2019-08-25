import $ from 'jquery';
import MEditor from 'meditor';

MEditor.components['photo'] = {
    init: function (contentArea, container, component, meditor) {
        let componentContent = component.children('.meditor-component-content');
        let img = componentContent.find('img');
        
        img.css('display', 'inline-block');
    },
    
    settingEnabled: true,
    
    settingTitle: 'Photo Settings',
    
    initSettingForm: function (form, meditor) {
        let self = this;
        let options = meditor.options;
        
        form.append(
            '<form class="form-horizontal">' +
            '   <div class="form-group">' +
            '       <div class="col-sm-12">' +
            '           <button type="button" class="btn btn-block btn-primary" id="photo-edit">Change Photo</button>' +
            '           <input type="file" style="display: none" />' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <div class="col-sm-12">' +
            '           <center><b>OR</b></center>' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="photo-width" class="col-sm-12">URL</label>' +
            '       <div class="col-sm-12">' +
            '           <input type="text" id="photo-url" class="form-control" />' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="photo-align" class="col-sm-12">Align</label>' +
            '       <div class="col-sm-12">' +
            '           <select id="photo-align" class="form-control">' +
            '               <option value="left">Left</option>' +
            '               <option value="center">Center</option>' +
            '               <option value="right">Right</option>' +
            '           </select>' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="photo-style" class="col-sm-12">Style</label>' +
            '       <div class="col-sm-12">' +
            '           <select id="photo-style" class="form-control">' +
            '               <option value="">None</option>' +
            '               <option value="img-rounded">Rounded</option>' +
            '               <option value="img-circle">Circle</option>' +
            '               <option value="img-thumbnail">Thumbnail</option>' +
            '           </select>' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="photo-width" class="col-sm-12">Width</label>' +
            '       <div class="col-sm-12">' +
            '           <input type="number" id="photo-width" class="form-control" />' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="photo-height" class="col-sm-12">Height</label>' +
            '       <div class="col-sm-12">' +
            '           <input type="number" id="photo-height" class="form-control" />' +
            '       </div>' +
            '   </div>' +
            '</form>'
        );
        
        let photoEdit = form.find('#photo-edit');
        let fileInput = photoEdit.next();
        photoEdit.on('click', function (e) {
            e.preventDefault();
            
            fileInput.trigger('click');
        });
        fileInput.on('change', function () {
            let file = this.files[0];
            if (/image/.test(file.type)) {
                let reader = new FileReader();
                
                reader.addEventListener('load', function (e) {
                    let img = meditor.getSettingComponent().find('img');
                    img.attr('src', e.target.result);
                    img.css({
                        width: '',
                        height: ''
                    });
                    img.load(function () {
                        meditor.showSettingPanel(meditor.getSettingComponent(), options);
                    });
                });
                
                reader.readAsDataURL(this.files[0]);
            } else {
                alert('Your selected file is not photo!');
            }
        });
        
        let inputAlign = form.find('#photo-align');
        inputAlign.on('change', function () {
            let panel = meditor.getSettingComponent().find('.photo-panel');
            panel.css('text-align', this.value);
        });
        
        let cbbStyle = form.find('#photo-style');
        cbbStyle.on('change', function () {
            let img = meditor.getSettingComponent().find('img');
            let val = this.value;
            
            img.removeClass('img-rounded img-circle img-thumbnail');
            if (val) {
                img.addClass(val);
            }
        });

        let inputUrl = form.find('#photo-url');
        inputUrl.on('change', function () {
            let img = meditor.getSettingComponent().find('img');
            img.attr('src', this.value);
        });
        
        let inputWidth = form.find('#photo-width');
        let inputHeight = form.find('#photo-height');
        inputWidth.on('change', function () {
            let img = meditor.getSettingComponent().find('img');
            let newWidth = +this.value;
            let newHeight = Math.round(newWidth / self.ratio);
            
            if (newWidth <= 0) {
                newWidth = self.width;
                newHeight = self.height;
                this.value = newWidth;
            }
            
            img.css({
                'width': newWidth,
                'height': newHeight
            });
            inputHeight.val(newHeight);
        });
        inputHeight.on('change', function () {
            let img = meditor.getSettingComponent().find('img');
            let newHeight = +this.value;
            let newWidth = Math.round(newHeight * self.ratio);
            
            if (newHeight <= 0) {
                newWidth = self.width;
                newHeight = self.height;
                this.value = newHeight;
            }
            
            img.css({
                'height': newHeight,
                'width': newWidth
            });
            inputWidth.val(newWidth);
        });
    },
    
    showSettingForm: function (form, component, meditor) {
        let self = this;
        let inputAlign = form.find('#photo-align');
        let inputWidth = form.find('#photo-width');
        let inputUrl = form.find('#photo-url');
        let inputHeight = form.find('#photo-height');
        let cbbStyle = form.find('#photo-style');
        
        let panel = component.find('.photo-panel');
        let img = panel.find('img');
        
        let algin = panel.css('text-align');
        if (algin !== 'right' || algin !== 'center') {
            algin = 'left';
        }
        
        if (img.hasClass('img-rounded')) {
            cbbStyle.val('img-rounded');
        } else if (img.hasClass('img-circle')) {
            cbbStyle.val('img-circle');
        } else if (img.hasClass('img-thumbnail')) {
            cbbStyle.val('img-thumbnail');
        } else {
            cbbStyle.val('');
        }
        
        inputAlign.val(algin);
        inputWidth.val(img.width());
        inputHeight.val(img.height());
        
        $('<img />').attr('src', img.attr('src')).load(function () {
            self.ratio = this.width / this.height;
            self.width = this.width;
            self.height = this.height;
        });
    }
};
