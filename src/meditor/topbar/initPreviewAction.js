import CSS_CLASS from '../constants/cssClass';
import initDynamicContent from '../component/initDynamicContent';
import getContent from '../getContent';
import ICON from '../constants/icon';
import closeSidebar from '../sidebar/closeSidebar';

export default function () {
    let self = this;
    let options = self.options;
    let btnPreview = $(`<a href="javascript:void(0);" title="${options.locale.previewOff}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.PREVIEW_OFF}</a>`);
    
    self.previewArea = $(`<div class="${CSS_CLASS.PREVIEW_AREA}"></div>`);
    self.contentAreasWrapper.after(self.previewArea);
    
    btnPreview.on('click', function (e) {
        e.preventDefault();
        
        let isPreviewOn = !btnPreview.hasClass(CSS_CLASS.STATE_ACTIVE);
        
        btnPreview.html(isPreviewOn ? ICON.PREVIEW_ON : ICON.PREVIEW_OFF);
        btnPreview[isPreviewOn ? 'addClass' : 'removeClass'](CSS_CLASS.STATE_ACTIVE);
        btnPreview.attr('title', isPreviewOn ? options.locale.previewOn : options.locale.previewOff);
        self.iframeBody[isPreviewOn ? 'addClass' : 'removeClass'](CSS_CLASS.STATE_PREVIEWING);

        self.previewArea.html('');

        // Close sidebar when previewing
        closeSidebar.call(self);

        if (isPreviewOn) {
            let iframeWin = self.iframe;
            let viewport = iframeWin[0].contentWindow.document.querySelector('meta[name=viewport]');
            let viewportContent = 'width=device-width, initial-scale=1.0';

            if (viewport === null) {
              let head = iframeWin[0].contentWindow.document.getElementsByTagName('head')[0];
              viewport = iframeWin[0].contentWindow.document.createElement('meta');
              viewport.setAttribute('name', 'viewport');
              head.appendChild(viewport);
            }

            viewport.setAttribute('content', viewportContent);

            let linkElement = iframeWin[0].contentWindow.document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('type', 'text/css');
            linkElement.setAttribute('href', encodeURIComponent("css/email.css"));
            iframeWin[0].contentWindow.document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        
        isPreviewOn && self.previewArea.html(getContent.call(self)).find('[data-dynamic-href]').each(function () {
            let dynamicElement = $(this);
            dynamicElement.html('Loading...');
            initDynamicContent.call(self, dynamicElement);
        });
    });
    
    self.topbarRight.append(btnPreview);
};
