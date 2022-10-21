import path from 'path'
import { copyFiles } from '../copyFiles'
import { deleteFiles } from '../deleteFiles'
import {
  getUpdateTemplateFiles,
  getDeleteTemplateFiles
} from '../config/templateFiles'
import {
  getUpdatePackageJson,
  getDeletePackageJson
} from '../config/packageJson'
import {
  packageInsertUpdateEntries,
  packageRemoveEntries
} from '../packageMaintenance'
import { enumMode } from '../interface/enumMode'

/**
 * Executes the following steps:
 *  - Updates files from the template folder
 *  - Delete files specified
 *  - Updates the packag.json file
 *  - Deletes entries from the package.json
 * @returns Promise<void>
 */
export async function xhubioUpdateScriptRun(args?: string[]): Promise<void> {
  let mode = enumMode.default

  if (args !== undefined && Array.isArray(args)) {
    if (args[0] === undefined) {
      args[0] = 'default'
    }
    if (args[0] !== 'default' && args[0] !== 'force' && args[0] !== 'clean') {
      throw new Error(
        `The parameter '${args[0]}' is not allowed. Valid parameter:(default|force|clean)`
      )
    }
    if (args[0] === 'force') {
      mode = enumMode.force
    } else if (args[0] === 'clean') {
      mode = enumMode.clean
    }
  }

  const templateFolder = path.join(__dirname, '..', '..', '..', 'templates')
  const filesUpdate = await getUpdateTemplateFiles()
  await copyFiles({
    templateFolder,
    files: filesUpdate,
    force: mode === enumMode.force
  })

  const filesDelete = await getDeleteTemplateFiles()
  await deleteFiles(filesDelete)

  const packageFile = 'package.json'
  const template = await getUpdatePackageJson()
  await packageInsertUpdateEntries({ packageFile, template, mode })

  const templateDelete = await getDeletePackageJson()
  await packageRemoveEntries({ packageFile, template: templateDelete })
}
