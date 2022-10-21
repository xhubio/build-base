import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

/**
 * This function replaces the image links in the gerenated markdown
 * in the root folder.
 */
async function replaceImageLinks(): Promise<void> {
  // read the file from the docApi directory
  const fileNameSrc = 'docApi/README.md'
  const fileNametarget = 'README.md'
  let fileContent = await readFile(fileNameSrc, 'utf8')
  fileContent = fileContent.replaceAll('(images/', '(doc/images/')
  fileContent = fileContent.replaceAll(
    '[Exports](modules.md)',
    '[Exports](docApi/modules.md)'
  )
  await writeFile(fileNametarget, fileContent)
}

replaceImageLinks()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Replace image links in README.md')
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e)
  })
