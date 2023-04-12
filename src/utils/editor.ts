import * as vscode from "vscode";

export function getFilePercentage(editor: vscode.TextEditor): number {
  const curr = getCurrentLine(editor);
  const total = getFileLineCount(editor);

  if (curr === 1) {
    return 0;
  } else if (curr === total) {
    return 100;
  } else {
    return +((curr / total) * 100).toFixed(1);
  }
}

export function getCurrentLine(editor: vscode.TextEditor): number {
  return editor.selection.active.line + 1;
}

export function getFileLineCount(editor: vscode.TextEditor): number {
  return editor.document.lineCount;
}
