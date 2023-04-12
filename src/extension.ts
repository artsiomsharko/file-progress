import * as vscode from "vscode";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    998
  );
  subscriptions.push(myStatusBarItem);

  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const percent = getFilePercentage(editor);

    myStatusBarItem.text = `${percent}%`;
    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}

function getFilePercentage(editor: vscode.TextEditor): number {
  const curr = editor.selection.active.line;
  const total = editor.document.lineCount - 1;

  if (curr === 0) {
    return 0;
  } else if (curr === total) {
    return 100;
  } else {
    return +((curr / total) * 100).toFixed(1);
  }
}
