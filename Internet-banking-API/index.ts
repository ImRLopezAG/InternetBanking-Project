/* eslint-disable @typescript-eslint/no-unused-vars */
import app from './src/app'
import { DbContext, UserModel } from './src/domain'
import { PORT } from './src/utils'

DbContext()
  .then(() => {
    const user = new UserModel()

    UserModel.find({ username: 'admin' }).then((res) => {
      if (!res.length) {
        user.firstName = 'admin'
        user.lastName = 'admin'
        user.username = 'admin'
        user.password = 'admin'
        user.email = 'admin@example.com'
        user.role = 1
        user.save()
          .then((res) => console.log(`first user saved:\n ${JSON.stringify(res.toJSON())}`))
          .catch((err) => console.log(err))
      }
    }).catch((err) => {
      console.log(err)
    })
    app.listen(PORT, () => {
      console.log(
            `Server started on port: ${
              PORT.startsWith('https') ? PORT : `http://localhost:${PORT}`
            }`
      )
    })
  })
  .catch((err) => {
    console.log(err.message)
  })
