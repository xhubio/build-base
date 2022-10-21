import fs from 'fs'
import path from 'path'
import util from 'util'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { packageInsertUpdateEntries, packageRemoveEntries } from '../src/index'
import { enumMode } from '../src/interface/enumMode'

const rm = util.promisify(rimraf)
const readFile = util.promisify(fs.readFile)
const copyFile = util.promisify(fs.copyFile)

const FIXTURES = path.join(__dirname, 'fixtures', 'packageMaintenance')
const VOLATILE = path.join(__dirname, 'volatile', 'packageMaintenance')

const FILE_TEMPLATE_INSERT_UPDATE = path.join(
  FIXTURES,
  'templateInsertUpdate.json'
)
const FILE_TEMPLATE_DELETE = path.join(FIXTURES, 'templateDelete.json')

beforeAll(async () => {
  await rm(VOLATILE)
  await mkdirp(VOLATILE)
})

const dataTable = [
  // ['testName', packageFile, packageResult, packageExpected, mode]

  // -------------------------
  // Empty Package
  // -------------------------
  [
    "empty package mit 'default' mode",
    'packageEmpty.json',
    'emptyDefault.json',
    'emptyDefault.json',
    'default'
  ],
  [
    "empty package mit 'force' mode",
    'packageEmpty.json',
    'emptyForce.json',
    'emptyForce.json',
    'force'
  ],
  [
    "empty package mit 'clean' mode",
    'packageEmpty.json',
    'emptyClean.json',
    'emptyClean.json',
    'clean'
  ],

  // -------------------------
  // Full Package
  // -------------------------
  [
    "Full package mit 'default' mode",
    'packageFull.json',
    'fullDefault.json',
    'fullDefault.json',
    'default'
  ],
  [
    "Full package mit 'force' mode",
    'packageFull.json',
    'fullForce.json',
    'fullForce.json',
    'force'
  ],
  [
    "Full package mit 'clean' mode",
    'packageFull.json',
    'fullClean.json',
    'fullClean.json',
    'clean'
  ]
]

test.each(dataTable)(
  '%s',
  async (name, packageFile, packageResult, packageExpected, mode) => {
    const fileResultBase = path.join(FIXTURES, packageFile)
    const fileResult = path.join(VOLATILE, packageResult)
    const fileExpected = path.join(FIXTURES, 'expected', packageExpected)

    // prepare target file
    await copyFile(fileResultBase, fileResult)

    const template = await loadPackageFile(FILE_TEMPLATE_INSERT_UPDATE)
    await packageInsertUpdateEntries({
      packageFile: fileResult,
      template,
      mode: enumMode[mode as enumMode]
    })

    // vergleichen der Ergebnisse
    const resultExpectedRaw = await readFile(fileExpected, 'utf8')
    const resultExpected = JSON.parse(resultExpectedRaw)

    const resultRaw = await readFile(fileResult, 'utf8')
    const result = JSON.parse(resultRaw)

    expect(result).toEqual(resultExpected)
  }
)

test('package delete', async () => {
  process.chdir(VOLATILE)

  const fileResultBase = path.join(FIXTURES, 'packageFull.json')
  const fileResult = path.join(VOLATILE, 'fullDelete.json')
  const fileExpected = path.join(FIXTURES, 'expected', 'fullDelete.json')

  // prepare target file
  await copyFile(fileResultBase, fileResult)
  const template = await loadPackageFile(FILE_TEMPLATE_DELETE)

  await packageRemoveEntries({
    packageFile: fileResult,
    template
  })

  // vergleichen der Ergebnisse
  const resultExpectedRaw = await readFile(fileExpected, 'utf8')
  const resultExpected = JSON.parse(resultExpectedRaw)

  const resultRaw = await readFile(fileResult, 'utf8')
  const result = JSON.parse(resultRaw)

  expect(result).toEqual(resultExpected)
})

async function loadPackageFile(packageFile: string): Promise<any> {
  const targetRaw = await readFile(packageFile, 'utf8')
  return JSON.parse(targetRaw)
}
