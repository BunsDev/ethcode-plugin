import { JsonFragment } from "@ethersproject/abi";
import * as ethers from "ethers";

/// /////////
// RESULT //
/// /////////

export interface HardHatCompiledOutput {
  contractName: string;
  sourceName: string;
  /** The Ethereum Contract ABI. If empty, it is represented as an empty array. */
  abi: ReadonlyArray<JsonFragment>;
  bytecode: string;
  deployedBytecode: string;
}

export interface RemixCompiledOutput {
  data: {
    bytecode: BytecodeObject;
    deployedByteCode: BytecodeObject;
  };
  /** The Ethereum Contract ABI. If empty, it is represented as an empty array. */
  abi: ReadonlyArray<JsonFragment>;
}

export interface CompiledJSONOutput {
  contractType: number; // 0: null, 1: hardhat output, 2: remix output
  hardhatOutput?: HardHatCompiledOutput;
  remixOutput?: RemixCompiledOutput;
}

export const getAbi = (output: CompiledJSONOutput) => {
  if (output.contractType === 0) return [];

  if (output.contractType === 1) return output.hardhatOutput?.abi;

  return output.remixOutput?.abi;
};

export const getByteCode = (output: CompiledJSONOutput) : ethers.utils.BytesLike | undefined => {
  if (output.contractType === 0) return '';

  if (output.contractType === 1) return output.hardhatOutput?.bytecode;

  return output.remixOutput?.data.bytecode.object;
};

/// ///////////
// BYTECODE //
/// ///////////
export interface BytecodeObject {
  /** The bytecode as a hex string. */
  object: ethers.utils.BytesLike;
  /** Opcodes list */
  opcodes: string;
  /** The source mapping as a string. See the source mapping definition. */
  sourceMap: string;
  /** If given, this is an unlinked object. */
  linkReferences?: {
    [contractName: string]: {
      /** Byte offsets into the bytecode. */
      [library: string]: { start: number; length: number }[];
    };
  };
}
