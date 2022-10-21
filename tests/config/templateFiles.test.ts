import {
  getInitialTemplateFiles,
  getUpdateTemplateFiles,
  getDeleteTemplateFiles
} from '../../src/index'

test('getInitialTemplateFiles', async () => {
  const data = await getInitialTemplateFiles()
  await expect(data.length).toBe(18)
})

test('getUpdateTemplateFiles', async () => {
  const data = await getUpdateTemplateFiles()
  await expect(data.length).toBe(10)
})

test('getDeleteTemplateFiles', async () => {
  const data = await getDeleteTemplateFiles()
  await expect(data.length).toBe(0)
})
