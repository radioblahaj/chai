const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getData(userID) {
    const getUser = await prisma.story.findFirst({
        where: {
            id: userID
        }

    })
}