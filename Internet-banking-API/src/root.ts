import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as router from './presentation'
import { BASE } from './utils'

const app: Application = express()

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
  res.redirect(`${BASE}docs`)
})

app.use(`${BASE}docs`, router.docs)
app.use(`${BASE}auth`, router.auth)
app.use(`${BASE}user`, router.user)
app.use(`${BASE}product`, router.product)
app.use(`${BASE}payment`, router.payment)
app.use(`${BASE}beneficiary`, router.beneficiary)

app.use('*', router.errorHandler)

export default app
