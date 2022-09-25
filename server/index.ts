import express, { Request, Response } from 'express'
import next from 'next'

const HOSTNAME = process.env.HOSTNAME ?? 'localhost'
const PORT = Number(process.env.PORT ?? 3000)
const IS_DEV = process.env.NODE_ENV !== 'production'

const app = next({
    dev: IS_DEV,
    hostname: HOSTNAME,
    port: PORT
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/api/hello-world', (req, res) => {
        res.json({ message: 'Hello world from Express!' })
    })

    server.get('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    server.listen(PORT, () => {
        console.log(`> 🚀 Ready on http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})