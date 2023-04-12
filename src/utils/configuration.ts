import * as vscode from "vscode";

export const SHOW_DECIMAL = "fileProgress.showDecimal";

function getConfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration();
}

export function getShowDecimal(): boolean {
  return getConfig().get(SHOW_DECIMAL) as boolean;
}

export function toggleShowDecimal(): void {
  getConfig().update(SHOW_DECIMAL, !getShowDecimal(), true);
}
