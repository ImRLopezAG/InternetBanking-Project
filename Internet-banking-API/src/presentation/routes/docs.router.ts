import { Router } from 'express'
import { SwaggerTheme } from 'swagger-themes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSetup } from '../../shared/libs'

export const docs = Router()
const theme = new SwaggerTheme('v3').getBuffer('dark')

docs.use('/', swaggerUi.serve)
docs.get(
  '/',
  swaggerUi.setup(swaggerSetup, {
    customSiteTitle: 'Internet - Banking  API Docs',
    customCss: `.swagger-ui .topbar { display: none } .description{ display: none } .info__contact{ display: none } ${theme}`
  })
)
