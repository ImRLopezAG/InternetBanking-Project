/* eslint-disable @typescript-eslint/no-unused-vars */
import app from './src/root'
import { ProductModel, UserModel, BeneficiaryModel, PaymentModel, DbContext } from './src/domain'
import { PORT } from './src/utils/constants'

DbContext()
  .then(() => {
    const user = new UserModel()
    const product = new ProductModel()
    const payment = new PaymentModel()
    const beneficiary = new BeneficiaryModel()
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
