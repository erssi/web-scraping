import { Request, Response, NextFunction } from 'express'

export function localAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  req.query.email = 'x'
  req.query.password = 'x'
  next()
}
