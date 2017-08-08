# Angular4 + Electron Boilerplate

# Einleitung
Die Entwickler vom Elektron Framework fangen ihre Produktbeschreibung mit folgendem Slogan an: "if you can build a website, you can build a desktop app". Ich denke dem ist nichts hinzuzufügen, außer meinem kleinen Guide, der dir zeigt wie du eine Angular4 Webapp mit Electron, in eine plattformunabhängige Desktop Applikation verwandelst.

Zum erstellen und Verwalten der APP werde ich die beliebte Angular-CLI benutzen.

## Vorraussetzungen
Ich setze nicht voraus, dass du die Angular-CLI installiert hast. Jedoch sollte NodeJS und NPM bereits in einer nicht zu alten Version(>=6.0) installiert sein. 

## Vorbereitung
Um ein neues Angular4 Projekt zu erstellen, benötigst du nicht zwingend die Angular-CLI. Ich würde aber stets empfehlen sie zu benutzen. Das hat vielerlei Gründe, nicht zuletzt, das bereits alles vorkonfiguriert ist. Selbst ein Testframework steht dir zur Verfügung. 

Um die Angular-CLI zu installieren öffne eine Konsole und gebe folgenden Befehl ein:

```terminal 
npm install -g @angular/cli
```
Die Angular-CLI wird global auf deinem System installiert. Navigiere in den Ordner in dem du deine App erstellen willst. Bei mir ist das **~/repo/private/**. Da ich Linux benutze, was eher selten ist, werden bei dir die Pfade wohl anders aussehen. Das ist aber allein kein Problem. Ich gebe meine Pfade immer an, damit du logisch nachvollziehen kannst was ich gemacht habe.

Die neue App erstellst du jetzt in deinem Ordner wie folgt:

```terminal
~/repo/private$ ng new angular4electron
```
**ng new** erstellt die App mitsamt der Abhängigkeiten und verdrahtet alles logisch miteinander. Der Name der App ist jetzt **angular4electron**, du kannst aber ruhig etwas besseres nehmen. Leider fehlt mir gerade die Fantasie. 

In meinem Ordner **~/repo/private** befindet sich jetzt ein neuer Ordner **angular4electron**. Öffne den Ordner und schaue einmal drüber. Ich werde jetzt nicht auf die einzelnen Dateien eingehen, da das kein Angular4 tutorial ist. Dennoch solltest du testen ob alles funktioniert. Das kannst du durch folgenden Befehl im neuen Ordner testen:

```terminal
~/repo/private/angular4electron$ ng serve
```
Der Output sollte dann in etwa so aussehen: 


