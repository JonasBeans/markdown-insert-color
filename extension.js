// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const availableColor = ["aqua","black","blue","fuchsia","gray","green","lime","maroon","navy","olive","purple","red","silver","teal","white","yellow","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","navyblue","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('insert-markdown-color-snippet.insert.color.by.choice', function () {

				insertColorSnippet();
	});
	context.subscriptions.push(disposable);
}

function insertColorSnippet(){
	Promise.resolve(makeColorChoice())
			.catch((error) => {
				vscode.window.showInformationMessage(error);
			});
}

function insertText(color){
	let editor = vscode.window.activeTextEditor;
	let selectedText = getSelectedText(editor);
	let selection = editor.selection;
	editor.edit((text) => {
		let colorCodeSnippet = `<span style=color:${color}>${selectedText}</span>`;
		text.replace(selection, colorCodeSnippet);
	});
}

function makeColorChoice(){
	return Promise.resolve(vscode.window.showInputBox())
		.then(color => { 
			if(color.trim() === "")
				throw new Error("Empty color")
			color = color.toLowerCase()
			if (!availableColor.includes(color)) 
				throw new Error(`${color} is not a valid CSS color`)
			return color;
		})
		.then(insertText)
		.catch((error) => {
			vscode.window.showErrorMessage(error.message);
		});
}


function getSelectedText(editor){
	let text = editor.document.getText(editor.selection);
	vscode.window.showInformationMessage(text);
	return text;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
