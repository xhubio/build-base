import {
  getInitialTemplateFiles,
  getUpdateTemplateFiles,
  getDeleteTemplateFiles
} from '../../src/index'

test('getInitialTemplateFiles', async () => {
  const data = await getInitialTemplateFiles()
  await expect(data.length).toBe(16)
})

test('getUpdateTemplateFiles', async () => {
  const data = await getUpdateTemplateFiles()
  await expect(data.length).toBe(8)
})

test('getDeleteTemplateFiles', async () => {
  const data = await getDeleteTemplateFiles()
  await expect(data.length).toBe(0)
})
