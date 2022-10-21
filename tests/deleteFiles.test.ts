/**
 * Checks that the deletion of the files works.
 */
import fs from 'fs'
import path from 'path'
import util from 'util'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import copyDir from 'copy-dir'
import { deleteFiles } from '../src/index'

const rm = util.promisify(rimraf)
const cp = util.promisify(copyDir)
const fsAccess = util.promisify(fs.access)

const INITIAL = path.join(__dirname, 'fixtures', 'deleteFiles')
const VOLATILE = path.join(__dirname, 'volatile', 'deleteFiles')

const PWD = process.cwd()

beforeAll(async () => {
  await rm(VOLATILE)
  await mkdirp(VOLATILE)

  // now copy the data from fixtures to the Volatile directory
  await cp(INITIAL, VOLATILE)
})

afterEach(async () => {
  process.chdir(PWD)
})

/*
 * Checks that copying the zip file from the included folder works.
 * Thereby existing files should NOT be overwritten.
 */
test('deleteFiles: No files to delete', async () => {
  process.chdir(VOLATILE)
  await expect(deleteFiles([])).resolves.toBeUndefined()
})

test('deleteFiles: One file does not exists', async () => {
  process.chdir(VOLATILE)
  await expect(
    deleteFiles(['file1.txt', 'file-gibtsnicht.txt', 'file2.txt'])
  ).resolves.toBeUndefined()

  // Check that the two files no longer exist
  await expect(fsAccess(path.join(VOLATILE, 'file1.txt'))).rejects.toThrow(
    `ENOENT: no such file or directory, access '${path.join(
      VOLATILE,
      'file1.txt'
    )}'`
  )
  await expect(fsAccess(path.join(VOLATILE, 'file2.txt'))).rejects.toThrow(
    `ENOENT: no such file or directory, access '${path.join(
      VOLATILE,
      'file2.txt'
    )}'`
  )
})
