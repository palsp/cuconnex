export declare function createWorkspace(
  content: WorkspaceContent,
  options: WorkspaceOptions
): Promise<string>;
export interface WorkspaceOptions {
  env: string;
  envTester?: string;
  name: string;
  packageJSON?: {
    [k: string]: any;
  };
}
export interface WorkspaceContent {
  [k: string]: string;
}
