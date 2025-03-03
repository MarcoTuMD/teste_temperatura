import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const port = 8000;
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

app.delete('/temperature/:id', async (req, res) => {
    const { id } = req.params
    const temp = await prisma.temperature.delete({
        where: { id: parseInt(id) }
    })
    res.json(temp)
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})