import { xhubioUpdateScriptRun } from './xhubioUpdateScript'

const args = process.argv.slice(2)

xhubioUpdateScriptRun(args)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(
      "Update of the 'package.json' file and other configuration files"
    )
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  })
