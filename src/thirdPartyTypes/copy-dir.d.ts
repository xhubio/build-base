declare module 'copy-dir' {
  export function copydir(
    from: string,
    to: string,
    options: Options,
    callback: (error: Error | null | undefined) => void
  ): void

  export function copydir(
    from: string,
    to: string,
    callback: (error: Error | null | undefined) => void
  ): void

  export interface Options {
    utimes?: boolean
    mode?: boolean
    cover?: boolean
  }

  export default copydir
}
