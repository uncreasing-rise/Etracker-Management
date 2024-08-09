declare module 'fast-csv' {
  import { Transform } from 'stream'

  export interface ParseOptions {
    headers?: boolean | string[] | ((row: any) => any)
    delimiter?: string
    quote?: string
    escape?: string
    trim?: boolean
    skipEmptyRows?: boolean
    skipRows?: number
    objectMode?: boolean
    highWaterMark?: number
  }

  export function parseStream(
    stream: NodeJS.ReadableStream,
    options?: ParseOptions
  ): Transform

  export function format(options?: { headers?: boolean | string[] }): Transform

  export function parse(options?: ParseOptions): Transform

  export function format(options?: { headers?: boolean | string[] }): Transform
}
