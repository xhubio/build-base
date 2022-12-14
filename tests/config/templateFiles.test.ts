import {
  getInitialTemplateFiles,
  getUpdateTemplateFiles,
  getDeleteTemplateFiles
} from '../../src/index'

test('getInitialTemplateFiles', async () => {
  const data = await getInitialTemplateFiles()
  await expect(data.length).toBe(17)
})

test('getUpdateTemplateFiles', async () => {
  const data = await getUpdateTemplateFiles()
  await expect(data.length).toBe(9)
})

test('getDeleteTemplateFiles', async () => {
  const data = await getDeleteTemplateFiles()
  await expect(data.length).toBe(0)
})
