import fs from 'fs'
import path from 'path'
import util from 'util'
import mkdirp from 'mkdirp'
import { typyFileHandling } from './interface/interfaceFileDefinition'
const fileExists = util.promisify(fs.access)
const copyFile = util.promisify(fs.copyFile)

/**
 * Interface for the 'copyFile' function
 * @param templateFolder - The path to the folder containing all the template files
 * @param files - A list of file names to be copied
 * @param force - if true, then existing files will be overwritten
 */
export interface InterfaceCopyFiles {
  // Path to the template folder
  templateFolder: string
  // The list of files to be copied
  files: typyFileHandling[]
  // if force=true then existing files will be overwritten
  force: boolean
}

/**
 * Copies the files from the templates folder in to the newly created modules root dir
 * @returns Promise<void>
 */
export async function copyFiles(params: InterfaceCopyFiles): Promise<void> {
  const { templateFolder, files, force } = params

  for (const file of files) {
    let src = file
    let dest = file
    if (typeof file === 'object') {
      src = file.src
      dest = file.dest
    }
    if (force) {
      // eslint-disable-next-line no-console
      console.log(`Copy file '${src}' to '${dest}'`)
      await copyFileHelper({
        templateFolder,
        src: src as string,
        dest: dest as string
      })
    } else {
      try {
        await fileExists(dest as string, fs.constants.F_OK)
        // If the file already exists, nothing needs to be done
      } catch (e) {
        // The file doesn't exist anymore, so we create it

        // eslint-disable-next-line no-console
        console.log(`Copy file '${src}' to '${dest}'`)
        await copyFileHelper({
          templateFolder,
          src: src as string,
          dest: dest as string
        })
      }
    }
  }
}

/**
 * Interface for the 'copyFile' function
 */
interface InterfaceCopyFileHelper {
  // Path to the template folder
  templateFolder: string
  // The name of the source file
  src: string
  // The name of the destination file
  dest: string
}

/**
 * Der eigentliche Kopiervorgang
 * @param params - The params for this function
 * @returns Promise<void>
 */
export async function copyFileHelper(
  params: InterfaceCopyFileHelper
): Promise<void> {
  const { templateFolder, src, dest } = params

  const srcPath = path.join(templateFolder, src)
  let destPath = dest
  if (dest === undefined || dest === '') {
    destPath = src
  }

  const dir = path.dirname(destPath)
  if (dir !== '.') {
    await mkdirp(dir)
  }

  await copyFile(srcPath, destPath)
}
