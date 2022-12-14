import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import glob from 'fast-glob'
import { readFile } from 'fs/promises'

describe('Vue', () => {
  describe('fixtures', async () => {
    const root = resolve(__dirname, '..')
    const files = await glob('tests/fixtures/*.{vue,js,ts}', {
      cwd: root,
      onlyFiles: true,
    })

    const transform = (code:string)=>{
      return code
    }

    for (const file of files) {
      it(file.replace(/\\/g, '/'), async () => {
        const filepath = resolve(root, file)
        const code = transform(await readFile(filepath,'utf-8'))
        expect(code).toMatchSnapshot()
      })
    }
  })
})
