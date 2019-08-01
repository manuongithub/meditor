import renderSnippet from './renderSnippet';
import CSS_CLASS from '../constants/cssClass';
import beautifyCategories from '../utils/beautifyCategories';

export default function (resp) {
    let self = this;
    let snippetsContentHtml = '';
    let snippetsHtml = '';
    
    $(resp).filter('div').each(function () {
        let snippet = $(this);
        let content = snippet.html().trim();
        let previewUrl = snippet.attr('data-preview');
        let type = snippet.attr('data-type');
        let title = snippet.attr('data-meditor-title');
        let categories = snippet.attr('data-meditor-categories') || '';
        let dataAttributes = self.getDataAttributes(snippet, ['data-preview', 'data-type', 'data-meditor-title', 'data-meditor-categories'], true);
        let [
            snippetPreviewHtml,
            snippetContentHtml
        ] = renderSnippet.call(self, type, title, previewUrl, categories, content, dataAttributes);
    
        snippetsHtml += snippetPreviewHtml;
        snippetsContentHtml += snippetContentHtml;
    });
    
    self.categoryContainer = beautifyCategories(self.categoryContainer);
    self.categoryComponent = beautifyCategories(self.categoryComponent);
    
    self.modal.find(`.${CSS_CLASS.SNIPPETS}`).html(snippetsHtml);
    self.modal.find(`.${CSS_CLASS.MODAL_BODY}`).append(snippetsContentHtml);
};
