import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as router from './presentation'
import { errorHandler } from './presentation'
import { BASE } from './utils/constants'

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

app.use('*', errorHandler)

export default app
