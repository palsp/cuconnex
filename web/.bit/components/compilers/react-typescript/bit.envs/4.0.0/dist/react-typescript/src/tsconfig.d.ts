import { GenericObject } from "@bit/bit.envs.common.compiler-types";
export declare const FIXED_OUT_DIR = "dist";
export declare function getTSConfig(
  isDev: boolean,
  overrideConfig: GenericObject
): {
  compilerOptions: {
    outDir: string;
    target: string;
    sourceMap: boolean;
    moduleResolution: string;
    esModuleInterop: boolean;
    module: string;
    allowSyntheticDefaultImports: boolean;
    resolveJsonModule: boolean;
    declaration: boolean;
    experimentalDecorators: boolean;
    inlineSourceMap: boolean;
    inlineSources: boolean;
    lib: string[];
    jsx: string;
    rootDir: string;
    removeComments: boolean;
    typeRoots: string[];
    importHelpers: boolean;
  };
  include: string[];
  exclude: string[];
} & GenericObject;
