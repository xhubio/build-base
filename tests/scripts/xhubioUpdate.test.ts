import { xhubioUpdateScriptRun } from '../../src/script/xhubioUpdateScript'
import { copyFiles } from '../../src/copyFiles'
import { packageInsertUpdateEntries } from '../../src/packageMaintenance'

jest.mock('../../src/copyFiles')
jest.mock('../../src/packageMaintenance')

test('xhubioUpdateScriptRun', async () => {
  await xhubioUpdateScriptRun()
  expect(copyFiles).toHaveBeenCalledTimes(1)
  expect(packageInsertUpdateEntries).toHaveBeenCalledTimes(1)
})
