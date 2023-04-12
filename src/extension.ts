import * as vscode from "vscode";
import { getCurrentLine, getFileLineCount, getFilePercentage } from "./utils/editor";
import { SHOW_DECIMAL, getShowDecimal, toggleShowDecimal } from "./utils/configuration";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 998);

  subscriptions.push(myStatusBarItem);
  subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
  subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(SHOW_DECIMAL)) {
        updateStatusBarItem();
      }
    })
  );

  updateStatusBarItem();

  vscode.commands.registerCommand("fileProgress.toggleDecimal", toggleShowDecimal);
}

function updateStatusBarItem(): void {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    myStatusBarItem.tooltip = `${getCurrentLine(editor)} line of ${getFileLineCount(editor)}`;
    myStatusBarItem.text = `${getFilePercentage(editor, getShowDecimal())}%`;

    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}
