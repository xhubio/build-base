import {
  getInitialPackageJson,
  getUpdatePackageJson,
  getDeletePackageJson
} from '../../src/index'

test('getInitialPackageJson', async () => {
  const data = await getInitialPackageJson()
  expect(data.main).toEqual('dist/src/index.js')
})

test('getUpdatePackageJson', async () => {
  const data = await getUpdatePackageJson()
  expect(data.scripts.build).toEqual(
    'npm run format && npm run lint && rimraf dist && tsc && depcheck'
  )
})

test('getDeletePackageJson', async () => {
  const data = await getDeletePackageJson()
  expect(data).toEqual({})
})
