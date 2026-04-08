import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from '@/lib/generated/prisma/client'

// execute npx prisma db seed install tsx if needed
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.prestation.createMany({
    data: [
      { name: 'Coiffure', price: 65, duration: 60 },
      { name: 'Manucure', price: 40, duration: 45 },
      { name: 'Soins Visage', price: 85, duration: 90 },
      { name: 'Épilation', price: 30, duration: 30 },
      { name: 'Massage', price: 90, duration: 60 },
      { name: 'Maquillage', price: 50, duration: 45 },
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
