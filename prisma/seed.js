const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const users = [
  {
    name: 'abid',
    email: 'abid@gmail.com',
    password: '12345',
    role: 'admin'
  },
  {
    name: 'abid2',
    email: 'abid2@gmail.com',
    password: '12345',
    role: 'clerk'
  },
  {
    name: 'abid3',
    email: 'abid3@gmail.com',
    password: '12345',
    role: 'customer'
  },
  {
    name: 'abid4',
    email: 'abid4@gmail.com',
    password: '12345',
    role: 'customer'
  },
  {
    name: 'abid5',
    email: 'abid5@gmail.com',
    password: '12345',
    role: 'customer'
  },
  {
    name: 'abid6',
    email: 'abid6@gmail.com',
    password: '12345',
    role: 'customer'
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of users) {
    const newUser = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${newUser.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
