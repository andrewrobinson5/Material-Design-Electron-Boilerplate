var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var dialog = remote.require('dialog');
var fs = require('fs');

var menu = new Menu();

var template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  }//,
  //{
    //label: 'Help',
    //role: 'help',
    //submenu: [
      //{
        //label: 'Go to ConnectSN',
        //click: function() { require('shell').openExternal('https://connectsn.com') }
      //},
    //]
  //},
];

if (process.platform == 'darwin') {
  var name = require('app').getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);



(function () {
    var remote = require('remote'); 
    var BrowserWindow = remote.require('browser-window'); 
    
    function init() {  
      document.getElementById("exit").addEventListener("click", function (e) {
        var window = BrowserWindow.getFocusedWindow();
        window.close();
      });

      document.getElementById("minimize").addEventListener("click", function (e) {
        var window = BrowserWindow.getFocusedWindow();
        window.minimize();
      }); 
    };

    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        init();
        var menubutton = document.getElementById('menu-button');
        var menu = document.getElementById('menu');
        var grey = document.getElementById('grey-area');
        menubutton.addEventListener('click', function(){
          if ( menu.className == 'activemenu' ) {
            menu.className = "";
            grey.className = "";
          } else {
            menu.className = "activemenu";
            grey.className = "grey-area-active"
          }
        });

        grey.addEventListener('click', function(){
          menu.className = "";
          grey.className = "";
        });
      };
    };
})();

function importMusic () {
  dialog.showOpenDialog({ filters: [{ name: 'All Supported Audio Files: .wav, .ogg, .mp3', extensions: ['wav', 'ogg', 'mp3'] }]},function (fileNames) {    
    
  }); 
}