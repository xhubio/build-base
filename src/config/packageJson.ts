import fs from 'fs'
import path from 'path'
import util from 'util'

const readFile = util.promisify(fs.readFile)

/**
 * Defines all the data whoch should be in the package.json file
 */

/**
 * Returns the values which should be initialy in a new package.json file
 *
 * @returns template - A json object which is used as a  package.json template.
 */
export async function getInitialPackageJson(): Promise<any> {
  return await readJson(path.join(__dirname, 'packageInitial.json'))
}

/**
 * Returns the values which should be added or be overwritten in an already
 * existing package.json file
 *
 * @returns template - A Json object with all the properties for adding or replace
 */
export async function getUpdatePackageJson(): Promise<any> {
  return await readJson(path.join(__dirname, 'packageUpdate.json'))
}

/**
 * Returns the properties which should be deleted from an existing package file
 *
 * @returns deletes - An object with all the deletions
 */
export async function getDeletePackageJson(): Promise<any> {
  return await readJson(path.join(__dirname, 'packageDelete.json'))
}

/**
 * Reads a json file and returns the object
 * @param fileName - The name of the json file
 * @returns data - The parsed JASON data as an object
 */
async function readJson(fileName: string): Promise<any> {
  const data = await readFile(fileName, 'utf8')
  return JSON.parse(data)
}
