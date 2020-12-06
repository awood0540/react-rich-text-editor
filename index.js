import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

export class Overview extends SampleBase {
    constructor() {
        super(...arguments);
        // Rich Text Editor items list
        this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
            'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
        ];
        //Rich Text Editor ToolbarSettings
        this.toolbarSettings = {
            items: this.items
        };
    }
    mirrorConversion(e) {
        this.textArea = this.rteObj.contentModule.getEditPanel();
        let id = this.rteObj.getID() + 'mirror-view';
        let mirrorView = this.rteObj.element.querySelector('#' + id);
        let charCount = this.rteObj.element.querySelector('.e-rte-character-count');
        if (e.targetItem === 'Preview') {
            this.textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            this.textArea.innerHTML = this.myCodeMirror.getValue();
            charCount.style.display = 'block';
        }
        else {
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                this.textArea.parentNode.appendChild(mirrorView);
            }
            else {
                mirrorView.innerHTML = '';
            }
            this.textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            this.renderCodeMirror(mirrorView, this.rteObj.value);
            charCount.style.display = 'none';
        }
    }
    renderCodeMirror(mirrorView, content) {
        this.myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    handleFullScreen(e) {
        let sbCntEle = document.querySelector('.sb-content.e-view');
        let sbHdrEle = document.querySelector('.sb-header.e-view');
        let leftBar;
        let transformElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    }
    actionCompleteHandler(e) {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            this.rteObj.sourceCodeModule.getPanel().style.display = 'none';
            this.mirrorConversion(e);
        }
        else {
            setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id="rteTools">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} showCharCount={true} actionBegin={this.handleFullScreen.bind(this)} actionComplete={this.actionCompleteHandler.bind(this)} maxLength={2000} toolbarSettings={this.toolbarSettings}>
              <div>
                <p>The Rich Text Editor is WYSIWYG ("what you see is what you get") editor useful to create and edit content, and return the valid <a href='https://ej2.syncfusion.com/home/' target='_blank'>HTML markup</a> or <a href='https://ej2.syncfusion.com/home/' target='_blank'>markdown</a> of the content</p> <p><b>Toolbar</b></p><ol><li> <p>Toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo operations, HTML view, etc</p></li><li><p>Toolbar is fully customizable </p></li></ol> <p><b>Links</b></p><ol><li><p>You can insert a hyperlink with its corresponding dialog </p></li><li><p>Attach a hyperlink to the displayed text. </p></li><li><p>Customize the quick toolbar based on the hyperlink </p> </li></ol><p><b>Image.</b></p><ol><li><p>Allows you to insert images from an online source as well as the local computer </p> </li><li><p>You can upload an image</p></li><li><p>Provides an option to customize quick toolbar for an image</p></li></ol><img alt="Logo" src="https://ej2.syncfusion.com/react/demos/src/rich-text-editor/images/RTEImage-Feather.png" style={{ width: '300px' }}/>
              </div>
              <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table]}/>
            </RichTextEditorComponent>
          </div>
        </div>

      </div>);
    }
}

render(<Overview />, document.getElementById('sample'));