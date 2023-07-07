/* eslint-disable @typescript-eslint/no-unused-vars */
import app from './src/app'
import { DbContext } from './src/domain/database/context'
import { ProductModel, UserModel } from './src/domain'
import { PORT } from './src/utils/constants'

DbContext()
  .then(() => {
    const user = new UserModel()
    const product = new ProductModel()
    app.listen(PORT, () => {
      console.log(
        `Server started on port: ${
          PORT.startsWith('http') ? PORT : `http://localhost:${PORT}`
        }`
      )
    })
  })
  .catch((err) => {
    console.log(err.message)
  })
