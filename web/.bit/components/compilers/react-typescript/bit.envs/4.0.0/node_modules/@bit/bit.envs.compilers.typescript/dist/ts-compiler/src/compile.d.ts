import Vinyl from "vinyl";
import {
  CompilerContext,
  CompilationContext,
} from "@bit/bit.envs.common.compiler-types";
import "typescript";
import { Preset } from "@bit/bit.envs.common.preset";
export declare function compile(
  cc: CompilerContext,
  preset: Preset
): Promise<any>;
export declare function getNonCompiledFiles(
  files: Vinyl[],
  compiledFileTypes: Array<string>
): Vinyl[];
export declare function findMainFile(
  context: CompilationContext,
  dists: Vinyl[]
): string;
export declare function collectDistFiles(
  context: CompilationContext
): Promise<Vinyl[]>;
export declare function getCapsuleName(ctx: CompilerContext): string;
