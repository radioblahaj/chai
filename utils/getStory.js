const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getData(userID, database_field) {
    await prisma.story.update({
        where: {
          id: userID
        },
        data: {
         database_field: true,
          visits: {increment: 1}
        },
      })
}

module.exports(getData)