import initPreviewAction from './initPreviewAction';
import initSaveAction from './initSaveAction';

export default function () {
    let self = this;
    
    initPreviewAction.apply(self);
    initSaveAction.apply(self);
};
