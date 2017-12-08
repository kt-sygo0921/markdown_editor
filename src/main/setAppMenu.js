import {app,Menu,BrowserWindow} from 'electron';

function setAppMenu(options) {
    const templete = [
        {
            label:'File',
            submenu:[
                {
                    label: 'Open',accelerator:'CmdOrCtrl+O',click:()=>options.openFile()
                },
                {
                    label: 'Save',accelerator:'CmdOrCtrl+S',click:()=>options.saveFile()
                },
                {
                    label: 'Save as...', click:()=>options.saveAsNewFile()
                },
                {
                    label: 'Export PDF', click:()=>options.exportPDF()
                }
            ]
        },
        {
            label:'Edit',
            submenu: [
                {
                    label: 'Copy',accelerator: 'CmdOrCtrl+C', role:'copy'
                },
                {
                    label: 'Paste', accelerator: 'CmdOrCtrl+V',role:'paste'
                },
                {
                    label: 'Cut',accelerator: 'CmdOrCtrl+X',role:'cut'
                },
                {
                    label: 'SelectAll', accelerator: 'CmdOrCtrl+A', role:'selectall'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Devtools',
                    accelerator: 'Alt+Command+I',
                    click:() => BrowserWindow.getFocusedWindow().toggleDevTools()
                }
            ]
        }
    ];
    if(process.platform === 'darwin') {
        templete.unshift(
            {
                label: 'MarkDownEditor',
                submenu: [
                    {
                        label: 'Quit', accelerator: 'CmdOrCtrl+Q', click:()=>app.quit()
                    }
                ]
            }
        );
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(templete));
}

export default setAppMenu;