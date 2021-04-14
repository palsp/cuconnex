import Helper from "bit-bin/dist/e2e-helper/e2e-helper";
import { GenericObject } from "./compiler-types";
export declare type BuildResult = {
  directory: string;
  files: string[];
  showComponent: GenericObject;
};
export declare type BuildOptions = {
  shouldPrintOutput?: boolean;
  shouldDebugEnvironment?: boolean;
  compilerPath?: string;
  disableBuildStep?: boolean;
  component?: GenericObject;
  envTester?: string;
};
export declare function getDefaultComponent(): GenericObject;
export declare function getBitAddCommand(
  files: Array<string>,
  compId: string
): string;
export declare function buildComponentInWorkspace(
  helper: Helper,
  opts?: BuildOptions
): Promise<BuildResult>;
export declare function getFileName(path: string): string;
export declare function removeWorkspace(directory: string): Promise<unknown>;
