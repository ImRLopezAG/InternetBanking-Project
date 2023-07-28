import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as router from './presentation/routes'
import { BASE } from './utils'
import { authValidation, errorHandler } from './presentation/middleware'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
  res.redirect(`${BASE}docs`)
})

app.use(`${BASE}docs`, router.docs)
app.use(`${BASE}auth`, router.auth)
app.use(`${BASE}user`, authValidation, router.user)
app.use(`${BASE}product`, authValidation, router.product)
app.use(`${BASE}payment`, authValidation, router.payment)
app.use(`${BASE}beneficiary`, authValidation, router.beneficiary)

app.use('*', errorHandler)

export default app
