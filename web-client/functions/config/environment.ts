import 'dotenv/config'

interface IEnvironment {
  appPort: number
  appUrl: string
  mongoUrl: string
}

function createEnv (): Readonly<IEnvironment> {
  const appPort = Number(process.env.PORT) || 3333
  const appUrl = process.env.APP_URL || `http://localhost:${appPort}`
  const mongoUrl = process.env.MONGO_URL || 'mongodb://theprivatecollection.co:27017'

  return {
    appPort,
    appUrl,
    mongoUrl,
  }
}

export const environment = createEnv()
