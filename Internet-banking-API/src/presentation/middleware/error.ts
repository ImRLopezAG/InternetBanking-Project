import { BASE } from '../../utils'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  return res.status(500).send({ message: err.message })
}

export const redirectHandler = (_req: Request, res: Response): void => {
  return res.status(301).redirect(`${BASE}docs`)
}
