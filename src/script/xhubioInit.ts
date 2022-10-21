import { xhubioInitScriptRun } from './xhubioInitScript'

xhubioInitScriptRun()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Created the initial files')
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  })
