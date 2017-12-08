import React from 'react';
import Editor from './Editor';
import Previewer from './Previewer';

import {ipcRenderer} from 'electron';

import style from './MarkDownEditorUI.css'

export default class MarkDownEditorUI extends React.Component {
    constructor(props){
        super(props);
        this.state={text:""};
        this.onChangeText = this.onChangeText.bind(this);
    }
    componentDidMount() {
        //開く
        ipcRenderer.on('SEND_TEXT',(_e,text)=>{
            this.setState({text})
        });
        //別名で保存
        ipcRenderer.on('REQUEST_TEXT',()=>{
            ipcRenderer.send('REPLY_TEXT',this.state.text);
        });
    }
    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }
    onChangeText(e) {
        this.setState({text: e.target.value});
    }
    render() {
        return(
            <div className={style.markdownEditor}>
                <Editor
                className={style.editorArea}
                value={this.state.text}
                onChange={this.onChangeText}
                />
                <Previewer className={style.previewerArea} value={this.state.text}/>
            </div>
        )
    }
}