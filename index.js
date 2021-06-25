const app = require('./app')
const db = require('./src/db/index')

const PORT = process.env.PORT || 8081

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port ${PORT}!`)
  })
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.massage} `)
})
// const start = async () => {
//   try {
//     await db()

//     app.listen(PORT, () => {
//       console.log(`Server works at port ${PORT}!`)
//     })
//   } catch (err) {
//     console.error(`Failed to launch application with error: ${err.message}`)
//   }
// }

// start()
