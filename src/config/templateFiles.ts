import fs from 'fs'
import path from 'path'
import util from 'util'
import { typyFileHandling } from '../interface/interfaceFileDefinition'

const readFile = util.promisify(fs.readFile)

/**
 * Defines the file names of the template files
 */

/**
 * Returns the list of initial files to be copied
 *
 * @returns initialTemplates - The list of the initial template file definitions
 */
export async function getInitialTemplateFiles(): Promise<typyFileHandling[]> {
  return await readJson(path.join(__dirname, 'templateFilesInitial.json'))
}

/**
 * Returns the list of template files which should be updated
 *
 * @returns updateTemplates - The list of the template file definitions to be updated
 */
export async function getUpdateTemplateFiles(): Promise<typyFileHandling[]> {
  return await readJson(path.join(__dirname, 'templateFilesUpdate.json'))
}

/**
 * Returns the list of files whisch schoudl be deleted
 *
 * @returns deleteTemplates - The list of the template file definitions to be deleted
 */
export async function getDeleteTemplateFiles(): Promise<string[]> {
  const filesToDelete = readJson(
    path.join(__dirname, 'templateFilesDelete.json')
  )
  // The file deletion contains only an array of strings
  return filesToDelete as unknown as string[]
}

/**
 * Reads a json file and returns the object
 * @param fileName - The name of the json file
 * @returns data - The parsed JASON data as an object
 */
async function readJson(fileName: string): Promise<typyFileHandling[]> {
  const data = await readFile(fileName, 'utf8')
  return JSON.parse(data)
}
