import { CompilerContext, GenericObject } from "./compiler-types";
export declare const DEBUG_FLAG = "DEBUG";
export declare function isolate(
  cc: CompilerContext,
  isolateOptions?: GenericObject,
  capsulePath?: string
): Promise<{
  res: any;
  directory: string;
}>;
