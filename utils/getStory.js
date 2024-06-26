const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getData(userID) {
    await prisma.story.update({
        where: {
          id: userID
        },
        data: {
          visits: {increment: 1}
        },
      })
}

module.exports = { getData };