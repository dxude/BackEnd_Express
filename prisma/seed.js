
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  await prisma.avaliacao.deleteMany();
  await prisma.meta.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.profissional.deleteMany();

  const prof1 = await prisma.profissional.create({
    data: { email: 'dr.carlos@email.com', nome: 'Dr. Carlos', especialidade: 'Psicologia' },
  });
  const prof2 = await prisma.profissional.create({
    data: { email: 'dra.ana@email.com', nome: 'Dra. Ana', especialidade: 'Terapia Ocupacional' },
  });
  
  
  const user1 = await prisma.usuario.create({
    data: { email: 'joao@email.com', nome: 'João Silva' },
  });
  const user2 = await prisma.usuario.create({
    data: { email: 'maria@email.com', nome: 'Maria Souza' },
  });
  
  await prisma.meta.create({ data: { descricao: 'Praticar mindfulness 10 min por dia', autorId: user1.id } });
  await prisma.meta.create({ data: { descricao: 'Ler um capítulo de um livro por semana', autorId: user2.id } });

  await prisma.avaliacao.create({
    data: { nota: 5, comentario: 'Excelente profissional, muito atencioso.', autorId: user1.id, profissionalId: prof1.id },
  });
  await prisma.avaliacao.create({
    data: { nota: 4, comentario: 'A Dra. Ana me ajudou muito com a organização.', autorId: user2.id, profissionalId: prof2.id },
  });
  
  console.log('Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });