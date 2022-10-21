import fs from 'fs'
import path from 'path'
import util from 'util'
const fsUnlink = util.promisify(fs.unlink)

/**
 * Deletes a list of given files. If the filenames are relative, then this is
 * to the root aof the using repository
 * @param files - an array of files which should be deleted
 * @returns Promise<void>
 */
export async function deleteFiles(files: string[]): Promise<void> {
  for (const file of files) {
    if (!path.isAbsolute(file)) {
      // Because of security reasons absolute pathes are ignored
      try {
        await fsUnlink(file)
        // eslint-disable-next-line no-console
        console.log(`Delete the file: '${file}'`)
      } catch (e) {
        // When it tries to remove a non existing file, no error should be thrown
        if (
          !(e as Error).message.startsWith('ENOENT: no such file or directory')
        ) {
          throw e
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(`Absolute paths could not be deleted: '${file}'`)
    }
  }
}
