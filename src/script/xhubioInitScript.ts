import path from 'path'

import { copyFiles } from '../copyFiles'
import { getInitialTemplateFiles } from '../config/templateFiles'
import { getInitialPackageJson } from '../config/packageJson'
import { packageInsertUpdateEntries } from '../packageMaintenance'
import { enumMode } from '../interface/enumMode'

/**
 * Executes the following steps:
 *  - Copies all the Template Files
 *  - prefill the Package.json file
 * @returns Promise<void>
 */
export async function xhubioInitScriptRun(): Promise<void> {
  const templateFolder = path.join(__dirname, '..', '..', '..', 'templates')
  const files = await getInitialTemplateFiles()
  await copyFiles({ templateFolder, files, force: false })

  const packageFile = 'package.json'
  const template = await getInitialPackageJson()
  await packageInsertUpdateEntries({
    packageFile,
    template,
    mode: enumMode.force
  })
}
