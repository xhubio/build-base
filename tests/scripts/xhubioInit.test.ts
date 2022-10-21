import { xhubioInitScriptRun } from '../../src/script/xhubioInitScript'
import { copyFiles } from '../../src/copyFiles'
import { packageInsertUpdateEntries } from '../../src/packageMaintenance'

jest.mock('../../src/copyFiles')
jest.mock('../../src/packageMaintenance')

test('xhubioInitScript', async () => {
  await xhubioInitScriptRun()
  expect(copyFiles).toHaveBeenCalledTimes(1)
  expect(packageInsertUpdateEntries).toHaveBeenCalledTimes(1)
})
