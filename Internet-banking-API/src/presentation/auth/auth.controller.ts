import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../domain'
import { SECRET } from '../../utils/constants'

interface IAuth {
  username: string
  password: string
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const { username, password }: IAuth = req.body
  if (username === undefined || password === undefined) {
    return res.status(400).json({
      error: `The property ${
        username === undefined ? 'username' : 'password'
      } is required`
    })
  }

  try {
    let user = await UserModel.findOne({ username }).exec()
    if (!user) {
      user = await UserModel.findOne({ email: username }).exec()
      if (!user) {
        return res.status(400).json({ error: 'The user does not exist' })
      }
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ error: 'The password is incorrect' })
    }

    const token = jwt.sign(
      {
        sub: user.username,
        email: user.email,
        uid: user._id,
        role: user.role
      },
      SECRET,
      {
        expiresIn: '1d',
        issuer: 'my app',
        audience: 'my users',
        jwtid: crypto.randomBytes(16).toString('hex')
      }
    )
    req.uid = user.id
    return res
      .status(200)
      .header('Authorization', token)
      .json({ message: 'Login successful', token, success: true })
  } catch (err) {
    if (err instanceof Error) {
      next(err)
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
