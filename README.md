# Angular4 + Electron Boilerplate

# Einleitung
Die Entwickler vom Elektron Framework fangen ihre Produktbeschreibung mit folgendem Slogan an: "if you can build a website, you can build a desktop app". Ich denke dem ist nichts hinzuzufügen, außer meinem kleinen Guide, der dir zeigt wie du eine Angular4 Webapp mit Electron, in eine plattformunabhängige Desktop Applikation verwandelst.

Zum erstellen und Verwalten der APP werde ich die beliebte Angular-CLI benutzen.

## Voraussetzungen
Ich setze nicht voraus, dass du die Angular-CLI installiert hast. Jedoch sollte NodeJS und NPM bereits in einer nicht zu alten Version(>=6.0) installiert sein. 

## Vorbereitung
Um ein neues Angular4 Projekt zu erstellen, benötigst du nicht zwingend die Angular-CLI. Ich würde aber stets empfehlen sie zu benutzen. Das hat vielerlei Gründe, nicht zuletzt, das bereits alles vorkonfiguriert ist. Selbst ein Testframework steht dir zur Verfügung. 

Um die Angular-CLI zu installieren öffne eine Konsole und gebe folgenden Befehl ein:

```bash 
npm install -g @angular/cli
```
Die Angular-CLI wird global auf deinem System installiert. Navigiere in den Ordner in dem du deine App erstellen willst. Bei mir ist das **~/repo/private/**. Da ich Linux benutze, was eher selten ist, werden bei dir die Pfade wohl anders aussehen. Das ist aber allein kein Problem. Ich gebe meine Pfade immer an, damit du logisch nachvollziehen kannst was ich gemacht habe.

Die neue App erstellst du jetzt in deinem Ordner wie folgt:

```bash
~/repo/private$ ng new angular4electron
```
**ng new** erstellt die App mitsamt der Abhängigkeiten und verdrahtet alles logisch miteinander. Der Name der App ist jetzt **angular4electron**, du kannst aber ruhig etwas besseres nehmen. Leider fehlt mir gerade die Fantasie. 

In meinem Ordner **~/repo/private** befindet sich jetzt ein neuer Ordner **angular4electron**. Öffne den Ordner und schaue einmal drüber. Ich werde jetzt nicht auf die einzelnen Dateien eingehen, da das kein Angular4 tutorial ist. Dennoch solltest du testen ob alles funktioniert. Das kannst du durch folgenden Befehl im neuen Ordner testen:

```bash
~/repo/private/angular4electron$ ng serve
```
Der Output sollte dann in etwa so aussehen: 

![alt text](https://raw.githubusercontent.com/EsSpricht/angular4electron/master/doc/images/first_start.png "Initial Start")

Schau dir die App im Browser an, indem du **http://localhost:4200** öffnest. Dich sollte jetzt eine Seite mit dem Titel "Welcome to app!" und ein paar weitere Komponenten erwarten.

Das war auch schon der grobe Angular part. Als nächstes zeige ich dir, was du einstellen musst um Electron um unsere App zu bauen.

## Electron Einrichten
Das Electron Framework bitte im Projektordner installieren:
```bash
~/repo/private/angular4electron$ npm install electron --save-dev --save-exact
```
**save-exact** wird benutzt, weil Electron nicht den dem Prinzip semantischer Versionierung folgt.
Da Electron jetzt installiert ist, musst du folgende Ordner/Dateien erstellen:

##### src/electron

Das ist ein neuer Ordner, in dem deine Electron Konfiguration liegt. In sieht der komplette Pfad so aus: ***~/repo/private/angular4electron/src/electron***

Dort wirst du jetzt zwei neue Dateien erstellen. Die erste dieser Dateien nennst du ***package.json*** und gibst ihr folgenden Inhalt:

```json
{
    "name": "angular-electron",
    "version": "0.1.0",
    "main": "main.js"
}
```
Das ist der Einstiegspunkt auf den wir später verweisen. Der wichtigste eintrag hierbei ist der Link zur eigentlichen Electron Konfiguration ***"main": "main.js"*** .
Da diese ***main.js*** noch nicht exisitert musst du sie erstellen. Der Inhalt sieht so aus:

```javascript
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```
Diese Datei beschreibt, wie dein Fenster später aussehen soll und welche Datei(URL) geladen werden soll. In diesem Fall ist das die Index.html, wie es auch der Browser macht. Für mehr Details solltest du dir die Electron Doku anschauen.

Folgende Dateien hast du erstellt:

***~/repo/private/angular4electron/src/electron/main.js***
***~/repo/private/angular4electron/src/electron/package.json***

Prinzpiell ist Electron jetzt lauffähig. Dummerweise weiß dein Projekt aber noch nicht, dass es Electron gibt. Dazu musst du erst die entsprechenden Build-Scripts anlegen. Öffne die Datei ***package.json***, die sich im Hauptverzeichnis befindet (nicht die Neue!). Hier mal der ganze Pfad, um Missverständnisse zu vermeiden: ***~/repo/private/angular4electron/package.json***

Navigiere zu dem Tag ***scripts*** und füge das hinzu:

```javascript
"scripts": {
 "ng": "ng",
 "start": "ng serve",
 "build": "ng build",
 "test": "ng test",
 "lint": "ng lint",
 "e2e": "ng e2e",
 "build-electron": "ng build --base-href . && cp src/electron/* dist/",
 "electron": "npm run build-electron && ./node_modules/.bin/electron dist/"
},
```

Die beiden Einträge ***build-electron*** sowie ***electron*** sind neu. Der Eintrag ***build-electron*** ruft den Angular-CLI Befehl ***ng-build --base-href .*** auf, welcher deine App baut und dann alles im Ordner ***dist*** ablegt. 
Das ***--base-href .*** Flag setzt die Basis URL auf ".", was soviel bedeuted wie "in diesem Verzeichnis". Da Electron auf file Ebene und nicht auf http Ebene operiert, ist das wichtig. Würde Electron in einer http Umgebung laufen (Wie eine Webseite), stünde dort "/". Genug geschwafelt, weiter mit der Eklärung. Der Teil ***cp src/electron/* dist/*** bewirkt, dass die Dateien die du im ***src/electron*** Verzeichnis abgelegt hast nach ***dist/*** , zu den anderen Build-Dateien, kopiert werden.

Zusätzlich hast du den Befehl ***electron*** hinzugefügt. Hier wird als erstes der vorher beschriebene Befehl ***build-electron*** ausgeführt. Anschließend wird Electron aufgerufen (Hast du installiert), und als parameter der Build-Ordner ***dist*** übergeben. Speichere die Änderungen ab.

#### Vorsicht: Die Pfade der oben beschriebenen Befehle funktionieren so nicht in einer Windows Umgebung. In so einem Falle müssen alle "/" mit "\\\\" ersetzt werden.

Electron wird deine App jetzt leider noch nicht anzeigen/laden. Es fehlen noch ein paar Einstellungen an der Applikation. Öffne die Datei ***~/repo/private/angular4electron/src/index.html*** und ändere sie so ab:
```html
<base href="./">
```
Aus ***"/"*** wird also ***"./"*** weil Electron wie schon erwähnt auf Dateiebene operiert. Als nächstes bitte noch ***~/repo/private/angular4electron/src/polyfill.js*** editieren. Ändere folgenden Import ab:

```javascript
import 'zone.js/dist/zone'; 
```
nach:

```javascript
import 'zone.js/dist/zone-mix'; 
```
Angular nutzt ZoneJS, Electron kommt damit aber nicht zurecht. Daher haben sich die ZoneJS Entwickler etwas einfallen lassen und eine neue dist zur Verfügung gestellt: ***zone-mix***. 

Das sind erst mal alle Einstellungen die du benötigst, um deine App starten zu können. Teste es doch einfach mal:

```bash
~/repo/private/angular4electron$ npm run electron
```
Es sollte ein waschechtes OS Fenster aufgehen, mit dem Inhalt deiner Angular4 App.

![alt text](https://raw.githubusercontent.com/EsSpricht/angular4electron/master/doc/images/electron_window1.png "Initial Start")

## Weitere Funktionen
Du bist jetzt an einer Stelle angekommen, an der du eventuell nicht mehr weiter machen musst, da dir der aktuelle Fortschritt schon langt. Das trifft genau dann zu, wenn du nicht vorhast mit dem Betriebssystem zu kommunizieren (z.B. Dateien lesen/schreiben), oder mit dem Electron Framework zu kommunizieren.
Im Moment kannst du aus deiner Angular2 Logik nicht auf Electron zugreifen. Außerdem denkt deine App nach wie vor, dass sie sich in der Umgebung Browser befindet, anstatt in der Umgebung Betriebssystem. Deswegen musst du den Zugriff auf Electron in deine App “biegen”. 

#### Der folgende Weg ist ein Workaround und eher schmuddelig!
Thorsten Hans hat ein Projekt entwickelt um angenehm auf Electron zuzugreifen. Das ganze mit TypeScript, wodurch man alle Vorteile von TS behält. Ich hatte leider noch keine Zeit es zu testen, aber es wäre mal einen Versuch wert.
Öffne die Datei ***~/repo/private/angular4electron/src/index.html*** und füge ihr folgendes Script hinzu:

```html
<head>
 <meta charset="utf-8">
 <title>BioApp</title>
 <base href="./">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link rel="icon" type="image/x-icon" href="favicon.ico">
 
 <script>
  var electron = require('electron');
 </script>
</head>
```

Du benutzt an dieser stelle die ***require()*** Methode, welche von ***NodeJS*** zur Verfügung gestellt wird, um Module zu laden. Diesen Trick benötigst du, da Electron ***commonJS*** nutzt um Module aufzulösen, dein Code wird aber schon mit ***Webpack*** kompiliert.
JavaScript kennt jetzt zwar die Variable ***electron***, das bringt dir aber nichts, da du ja TypeScript benutzt. Deshalb öffne doch mal die Datei ***~/repo/private/angular4electron/src/typings.d.ts*** und mache mit folgenden Einstellungen ***TypeScript*** mit ***Electron*** bekannt:

```typescript
/* SystemJS module definition */
declare var module: NodeModule;
declare var electron: any;

interface NodeModule {
 id: string;
}
```

Du kannst jetzt global auf die Variable ***electron*** zugreifen. Teste das doch einfach mal, indem du den Titel in ***~/repo/private/angular4electron/src/app/app.component.ts*** änderst:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String;

  constructor() {
    var app = electron.remote.app;
    this.title = app.getAppPath();
  }
}
```
Das wars auch schon, du greifst jetzt direkt über die global definierte ***electron*** Variable auf den App-Scope zu. 
Starte die App, um deine Änderungen zu testen. 

```bash
~/repo/private/angular4electron$ npm run electron
```

Solltest du jetzt anstelle von ***app*** den Pfad zu deiner App sehen.

![alt text](https://raw.githubusercontent.com/EsSpricht/angular4electron/master/doc/images/electron_window2.png "Electron Zugriff")

Du kannst jetzt auch eigene Functionen innerhalb der Electron Umgebung (renderer) definieren. Das solltest du auch gleich mal ausprobieren! Öffne die Datei ***~/repo/private/angular4electron/src/electron/main.js*** und füge ihr am Ende eine neue Methode hinzu:

```javascript
app.beiDerMachtVon = function () {
    return "Grayskull";
}
```

Rufe diese Methode in der Komponente ***~/repo/private/angular4electron/src/app.component.ts*** einmal auf:

```typescript
constructor(){
    var app = electron.remote.app;
    this.title = app.getAppPath();
    console.log(app.beiDerMachtVon());
}
```
Ob das geklappt hat, siehst du in der Konsole deiner App, die du mit ***``<STRG>+<SHIFT>+I``*** öffnen kannst, nachdem du die App erneut gebaut hast natürlich.

```bash
~/repo/private/angular4electron$ npm run electron
```
![alt text](https://raw.githubusercontent.com/EsSpricht/angular4electron/master/doc/images/electron_window3.png "Electron App Method")

Im laufe der Zeit wirst du mit Sicherheit auch mal innerhalb deiner Angular2 Logik auf Node.js zugreifen wollen! 
Zum Beispiel, wenn du neue Module laden willst (***require()***). Hierfür musst du (ebenfalls wie bei Electron) TypeScript mitteilen, dass es dort ein Framework mit diversen neuen Methoden gibt. 

#### Das schöne ist, dass im du hier nicht schmutzig arbeiten musst, 
weil es eine TypeScript Erweiterung für die ***Node.js*** Methoden gibt. Außerdem wird die Visual Studio Code Intelli-Sense um die neuen TypeScript Befehle erweitert. Um das zu erreichen sind folgende Schritte notwendig:
Installiere die ***node types***, indem du eine Konsole im Hauptverzeichnis deiner App öffnest und diesen Befehl eingibst:

```bash
~/repo/private/angular4electron/$ npm install --save @types/node
```

Füge die neuen Types zu deinen ***TypeScript Kompiler-Optionen*** hinzu, indem du die Datei ***~/repo/private/angular4electron/src/tsconfig.app.json*** erweiterst:

```javascript
"compilerOptions": {
  "outDir": "../out-tsc/app",
    "module": "es2015",
      "baseUrl": "",
        "types": [
          "node"
        ]
},
```

Teste die neuen Erweiterungen und baue folgenden Befehl in deine ***~/repo/private/angular4electron/src/app.component.ts*** ein:

```typescript
constructor(){
  var app = electron.remote.app;
  this.title = app.getAppPath();
  console.log(app.beiDerMachtVon());
  var platform = require('os').platform();
  console.log(platform);
}
```
Zusätzlich zu “Grayskull” solltest du jetzt auch noch die Ausgabe “Browser” in der Konsole sehen.

![alt text](https://raw.githubusercontent.com/EsSpricht/angular4electron/master/doc/images/console.png "Console browser")