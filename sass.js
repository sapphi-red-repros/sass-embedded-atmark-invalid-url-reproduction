const dartSass = require('sass')
const sassEmbedded = require('sass-embedded')
const path = require('path')

const importer = (p, importer) => {
  return { file: path.resolve(__dirname, './src', p.replace(/^\/@\//, '')) }
}

const run = (s) =>
  new Promise((resolve, reject) => {
    s.render(
      {
        file: 'src/foo.scss',
        importer
      },
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      }
    )
  })

;(async () => {
  console.log('[dart-sass]')
  const res1 = await run(dartSass)
  console.log(res1.css.toString())
  console.log()
  console.log('-----------')

  console.log('[sass-embedded]')
  const res2 = await run(sassEmbedded)
  console.log(res2.css.toString())
})()
