/**
 * Checks that the copying of the files works. Also the overwriting or
 * create new directories
 */
import fs from 'fs'
import path from 'path'
import util from 'util'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import copydir from 'copy-dir'
import { copyFiles } from '../src/index'

const rm = util.promisify(rimraf)
const cp = util.promisify(copydir)
const readFile = util.promisify(fs.readFile)
const fsAccess = util.promisify(fs.access)

const TEMPLATE_FOLDER = path.join(
  __dirname,
  'fixtures',
  'copyFiles',
  'templates'
)

const FIXTURES = path.join(__dirname, 'fixtures', 'copyFiles')
const VOLATILE = path.join(__dirname, 'volatile', 'copyFiles')
const VOLATILE_FORCE = path.join(__dirname, 'volatile', 'copyFilesForce')

// Emulate the copy of the files to an existing struture
const INITIAL = path.join(FIXTURES, 'forVolatile')

const PWD = process.cwd()

beforeAll(async () => {
  await rm(VOLATILE)
  await mkdirp(VOLATILE)

  await rm(VOLATILE_FORCE)
  await mkdirp(VOLATILE_FORCE)

  // Copy the data from fixtures to the Volatile directory
  await cp(INITIAL, VOLATILE)
  await cp(INITIAL, VOLATILE_FORCE)
})

afterEach(async () => {
  process.chdir(PWD)
})

/*
 * Checks that copying the zip file from the included folder works.
 * Existing files should NOT be overwritten
 */
test('copyFiles force=false', async () => {
  process.chdir(VOLATILE)

  const params = {
    templateFolder: TEMPLATE_FOLDER,
    files: [
      '.gumboStay.txt',
      {
        src: path.join('_src', 'script.js'),
        dest: path.join('src', 'script.js')
      }
    ],
    force: false
  }

  await copyFiles(params)

  // jetzt prüfen das die entsprechenden Dateien existieren
  await expect(
    fsAccess(path.join(VOLATILE, '.gumboStay.txt'))
  ).resolves.toBeUndefined()
  await expect(
    fsAccess(path.join(VOLATILE, 'src', 'script.js'))
  ).resolves.toBeUndefined()

  // prüfen das der Inhalt der '.gumboStay.txt' nicht überschrieben wurde
  const data = await readFile(path.join(VOLATILE, '.gumboStay.txt'), 'utf8')
  expect(data).toEqual('Diese Datei soll beibehalten werden.\n')
})

/*
 * Checks that copying the zip file from the included folder works.
 * Existing files should be overwritten
 */
test('copyFiles force=true', async () => {
  process.chdir(VOLATILE)

  const params = {
    templateFolder: TEMPLATE_FOLDER,
    files: [
      '.gumboStay.txt',
      {
        src: path.join('_src', 'script.js'),
        dest: path.join('src', 'script.js')
      }
    ],
    force: true
  }

  await copyFiles(params)

  // jetzt prüfen das die entsprechenden Dateien existieren
  await expect(
    fsAccess(path.join(VOLATILE, '.gumboStay.txt'))
  ).resolves.toBeUndefined()
  await expect(
    fsAccess(path.join(VOLATILE, 'src', 'script.js'))
  ).resolves.toBeUndefined()

  // prüfen das der Inhalt der '.gumboStay.txt' nicht überschrieben wurde
  const data = await readFile(path.join(VOLATILE, '.gumboStay.txt'), 'utf8')
  expect(data).toEqual(
    'Diese Datei soll beibehalten werden. Somit dürfte diese nicht im Volatile stehen.\n'
  )
})
