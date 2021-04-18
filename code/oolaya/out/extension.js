/**
 * Use Strict
 * Esta funcion se incorpora en ECMAScript 5 y es una forma de elegir una variante restringida de JavaScript, así implícitamente se deja de lado el modo poco riguroso.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
/**
 * @palabraReservada import
 * La sentencia import se usa para importar funciones que han sido exportadas desde un módulo externo
 */
/**
 * vscode
 * Libreria nativa que permite la construccion e inclusion de nuevas funcionalidades de codigo abierto el cual permite sin duda robuztes al usar VSCode.
 */
const vscode = require("vscode");
/**
 * Export
 * @palabraReservada export
 * Esta palabra reservada estableca la capacidad de esportar modulos, funciones, variables entre otras, para el caso puntual hacemo la exportacion de una funcion.
 */
/**
 * Metodo implementado de la clase abstracta y espacio de nombres para tratar con las extensiones instaladas.
 * Las extensiones están representadas por una interfaz de extensión que permite la reflexión sobre ellas.
 * @param context contexto extendido de vscode el cual representa la abstracción de una clase con el uso de una interfaz, cual indica cual será la estructura.
 */
function activate(context) {
    /**
     * la linea 34 de este codigo establece el registro del comando que esta descrito en el archivo pacgage.json seccion commands => command donde se da nombre al comando a ejecutar
     * para mi caso le he puesto el nombre oolaya.gapline.
     * dentro de este contexto damos inicio a la ejecucion misma de la extencion bajo una funcion de llamado
     */
    let disposable = vscode.commands.registerCommand("oolaya.gapline", () => {
        /**
         * Con la funcionalidad e la linea 39 hacemos es identificar el focus sobre el archivo que este en primer plano del editor de vscode
         * de tal forma que tengamos acceso al documento que este en la pantalla principal de vscode
         */
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        /**
         * Con la linea 47 de código lo que hacemos es reconocer de ese primer plano del edito que segmento esta con selección  y de esta forma en la linea
         * 48 es obtener esa selección.
         */
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        /**
         * La función  showInputBox establece la funcionalidad necesaria para obtener la cantidad de lineas con las cuales se pretende hacer salto haciendo uso
         * de un input e interactuar  con el usuario, dicha función es una promesa por tanto espera el llamado de retorno con el valor ingresado.
         */
        vscode.window.showInputBox({ prompt: "Lineas?" }).then((value) => {
            /**
             * @input value
             * representa el valor de linea que se espera insertar en blanco.
             */
            let numberOfLines = +value;
            /**
             * @variable textInChunks
             * Establecemos una variable de tipo array de subtipo string es decir un array de strings
             */
            var textInChunks = [];
            /**
             * 1. La función  split se usa para partir una cadena de caracteres y
             * asignarla  a un array sin embargo en este caso se esta solicitando que el split o el corte se haga cada vez que exista un espacio entre palabras
             * 2. Posterior a ello hacemos un forEach estructura  de bucle con la cual hacemos una asignación  a la variable  textInChunks utilizando un método  nativo de los arrays para tal fin "push"
             */
            text.split("\n").forEach((currentLine, lineIndex) => {
                textInChunks.push(currentLine);
                if ((lineIndex + 1) % numberOfLines === 0) {
                    textInChunks.push("");
                }
            });
            /**
             * En la linea 79 ahora hacemos que el texto se una con un espacio usando la funcion join
             */
            text = textInChunks.join("\n");
            /**
             * Teniendo la cadena lista solo resta realizar la edición  de las lineas que han sido seleccionadas y que ahora son modificadas por nuestra extención
             * para ello utilizamos el metodo edit que proviene de activeTextEditor
             */
            editor.edit((editBuilder) => {
                /**
                 * Creamos un nuevo objeto que permite construir  un rango especifico dentro del documento
                 */
                var range = new vscode.Range(selection.start.line, 0, selection.end.line, editor.document.lineAt(selection.end.line).text.length);
                /**
                 * Ahora el el editor builder que nos retorna el metodo edit reemplazamos el resultado  del objeto range y el texto que se ha dejado finalmente con la cantidad de espacios entre lineas que hemos establecido.
                 */
                editBuilder.replace(range, text);
            });
        });
    });
    /**
     * Fianalmente agregamos a la pila de subscripciones todo el proceso terminado.
     */
    context.subscriptions.push(disposable);
}
exports.activate = activate;
/**
 * declaramos el método  deactivate en cumplimiento de la implementación  de la interfaz
 */
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map