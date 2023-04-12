import * as vscode from "vscode";
import { getCurrentLine, getFileLineCount, getFilePercentage } from "./utils/editor";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 998);
  subscriptions.push(myStatusBarItem);

  subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    myStatusBarItem.tooltip = `${getCurrentLine(editor)} line of ${getFileLineCount(editor)}`;
    myStatusBarItem.text = `${getFilePercentage(editor)}%`;

    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}
