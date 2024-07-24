import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const port = 8080;
const host = '192.168.2.11'; // Modifique para escutar em todas as interfaces de rede

app.get('/temperatures', async (req, res) => {
    const temperatures = await prisma.temperature.findMany()
    res.json(temperatures)
})

app.get('/temperatures/:id', async (req, res) => {
    const { id } = req.params
    const temperature = await prisma.temperature.findUnique({
        where: { id: parseInt(id) }
    })
    res.json(temperature)
});

app.post('/temperature', async (req, res) => {
    const { macAddress, temperature } = req.body
    const temp = await prisma.temperature.create({
        data: {
            macAddress,
            temperature
        }
    })
    res.json(temp)
});

const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});