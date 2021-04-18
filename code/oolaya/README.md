


# # oolaya

## Creación de una extensión para Visual Studio Code

  ### Explicación de código:
  ## Use Strict
  >Esta funcion se incorpora en [ECMAScript 5](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Strict_mode) y es una forma de elegir una variante restringida de JavaScript, así implícitamente se deja de lado el modo poco riguroso.

```typeScript
   "use strict";
```
    
  ## import 
  >Export
> @palabraReservada [export](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export)
> Esta palabra reservada estableca la capacidad de esportar modulos, funciones, variables entre otras, para el caso puntual hacemo la exportacion de una funcion.

```typeScript
   import  *  as  vscode  from  "vscode";
```    

  ## Función active
  > Método implementado de la clase abstracta y espacio de nombres para tratar con las extensiones instaladas.
> * Las extensiones están representadas por una interfaz de extensión que permite la reflexión sobre ellas.
> * @param  context contexto extendido de vscode el cual representa la abstracción de una clase con el uso de una interfaz, cual indica cual será la estructura.

```typeScript
    export  function  activate(context: vscode.ExtensionContext){
	}
```    

  ## Linea 34 de código fuente
  > la linea 34 de este código establece el registro del comando que esta descrito en el archivo pacgage.json seccion commands => command donde se da nombre al comando a ejecutar para mi caso le he puesto el nombre oolaya.gapline.
> * dentro de este contexto damos inicio a la ejecución misma de la extensión bajo una función de llamado.

```typeScript
34|   let  disposable = vscode.commands.registerCommand("oolaya.gapline", () => {
    
    });
```  

  ## Linea 39, 42 de código fuente
  > Con la funcionalidad e la linea 39 hacemos es identificar el focus sobre el archivo que este en primer plano del editor de vscode  de tal forma que tengamos acceso al documento que este en la pantalla principal de vscode

```typeScript
39|   var  editor: any = vscode.window.activeTextEditor;
40|    if (!editor) {
41|          return;
42|		}
```  

  ## Linea 47, 48 de código fuente
  > Con la linea 47 de código lo que hacemos es reconocer de ese primer plano del edito que segmento esta con selección y de esta forma en la linea 48 es obtener esa selección.

```typeScript
47|   var  selection = editor.selection;
48|   var  text = editor.document.getText(selection);
```  

  ## Linea 54 de código fuente
  > La función showInputBox establece la funcionalidad necesaria para obtener la cantidad de  lineas con las cuales se pretende hacer salto haciendo uso de un input e interactuar con el usuario, dicha función es una promesa por tanto espera el llamado de retorno con el valor ingresado.

```typeScript
54|   vscode.window.showInputBox({ prompt:  "Lineas?" }).then((value: any) => {});

``` 
  ## Linea 59 de código fuente
  > @input value
> * representa el valor de linea que se espera insertar en blanco.

```typeScript
59|   let  numberOfLines = +value;
``` 

  ## Linea 64 de código fuente
>@variable textInChunks
>* Establecemos una variable de tipo array de subtipo string es decir un array de strings

```typeScript
64|   var  textInChunks: Array<string> = [];
``` 

  ## Linea 70, 75 de código fuente
>1. La función split se usa para partir una cadena de caracteres y asignarla a un array sin embargo en este caso se esta solicitando que el split o el corte se haga cada vez que exista un espacio entre palabras
> 2. Posterior a ello hacemos un forEach estructura de bucle con la cual hacemos una asignación a la variable textInChunks utilizando un método nativo de los arrays para tal fin "push"

```typeScript
70|   text.split("\n").forEach((currentLine: string, lineIndex: any) => {
71|		 textInChunks.push(currentLine);
72|		 if ((lineIndex + 1) % numberOfLines === 0) {
73|		 		textInChunks.push("");
74|		    }
75|		});
``` 

  ## Linea 79 de código fuente
>En la linea 79 ahora hacemos que el texto se una con un espacio usando la funcion join
```typeScript
79|   text = textInChunks.join("\n");
``` 
  ## Linea 84 de código fuente
>Teniendo la cadena lista solo resta realizar la edición de las lineas que han sido seleccionadas y que ahora son modificadas por nuestra extensión para ello utilizamos el metodo edit que proviene de activeTextEditor
```typeScript
84|   editor.edit((editBuilder: any) => {})
``` 
  ## Linea 88, 93 de código fuente
>Creamos un nuevo objeto que permite construir un rango especifico dentro del documento
```typeScript
88|   var  range = new  vscode.Range(
89|		selection.start.line,
90|		0,
91|		selection.end.line,
92|		editor.document.lineAt(selection.end.line).text.length
93|	  );
``` 

  ## Linea 97 de código fuente
>Ahora el el editor builder que nos retorna el método edit reemplazamos el resultado del objeto range y el texto que se ha dejado finalmente con la cantidad de espacios entre lineas que hemos establecido.
```typeScript
97|   editBuilder.replace(range, text);
 ``` 
 
 ## Linea 110 de código fuente
>declaramos el método deactivate en cumplimiento de la implementación de la interfaz
```typeScript
110|   export  function  deactivate() {}
 ``` 


___

>Oscar Alexander Olaya 
>1070951664
>Master ingeniería de software y sistemas informáticos. 