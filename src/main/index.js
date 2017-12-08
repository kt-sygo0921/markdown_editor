import {app} from 'electron';
import createMainWindow from './createMainWindow';
import setAppMenu from './setAppMenu';

//開く
import showOpenFileDialog from './showOpenFileDialog';
//名前をつけて保存
import showSaveAsNewFileDialog from './showSaveAsNewFileDialog';


import createFileManager from './fileManager';


// function openFile() {
//     showOpenFileDialog()
//     .then((filePath)=>{fileManager.readFile(filePath)})
//     .then((text)=>{mainWindow.sendText(text)})
//     .catch((err)=>{
//         console.log(err);
//     })
// }

async function openFile() {
    //Promiseで書くと、パスの取得とテキストの取得が同時に発火するためテキストが取得できない
    const filePath = await showOpenFileDialog();
    const text = await fileManager.readFile(filePath);
    await mainWindow.sendText(text)
    .catch((err)=>{
        console.log(err);
    })
}

function saveFile() {
    if(!fileManager.filePath) {
        saveAsNewFile();
        return;
    }
    mainWindow.requestText()
    .then((text)=>fileManager.overwriteFile(text))
    .catch((err) => {
        console.log(err)
    })
}

function saveAsNewFile() {
    Promise.all([showSaveAsNewFileDialog(),mainWindow.requestText()])
    .then(([filePath, text])=>fileManager.saveFile(filePath,text))
    .catch((err) =>{
        console.log(err);
    })
}

function exportPDF() {
    console.log('exportPDF');
}


let mainWindow = null;
let fileManager = null;

app.on('ready',()=> {
    mainWindow = createMainWindow();
    fileManager = createFileManager();
    setAppMenu({openFile,saveFile,saveAsNewFile,exportPDF});
});

app.on('window-all-closed',()=> {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate',(_e,hasVisibleWindows)=>{
    if(!hasVisibleWindows) {
        main.mainWindow = createMainWindow();
    }
})