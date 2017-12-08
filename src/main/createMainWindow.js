import {BrowserWindow,ipcMain} from 'electron';
import { resolve } from 'path';

class mainWindow {
    constructor() {
        this.window = new BrowserWindow({width: 800,height: 600});
        this.window.loadURL(`file://${__dirname}/../../index.html`);
        this.window.on('closed',()=> {
            this.window = null;
        });
    }
    sendText(text) {
        this.window.webContents.send('SEND_TEXT', text);
    }
    requestText() {
        return new Promise((resolve)=>{
            this.window.webContents.send("REQUEST_TEXT");
            ipcMain.once("REPLY_TEXT",(_e,text)=>{
                resolve(text);
            })
        })
    }
}

function createMainWindow() {
    return new mainWindow();
}

export default createMainWindow;

class hoge {
    constructor(){}
    aaa(bbb) {
        console.log(bbb);
    }
}