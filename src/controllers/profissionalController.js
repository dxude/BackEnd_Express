const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// C - Create
exports.createProfissional = async (req, res) => {
  try {
    const profissional = await prisma.profissional.create({ data: req.body });
    res.status(201).json(profissional);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar o profissional.' });
  }
};

// R - Retrieve all
exports.getAllProfissionais = async (req, res) => {
  const profissionais = await prisma.profissional.findMany({ include: { avaliacoes: true } });
  res.json(profissionais);
};

// R - Retrieve by ID
exports.getProfissionalById = async (req, res) => {
  const { id } = req.params;
  const profissional = await prisma.profissional.findUnique({
    where: { id: Number(id) },
    include: { avaliacoes: true }
  });
  profissional ? res.json(profissional) : res.status(404).json({ error: 'Profissional não encontrado.' });
};

// U - Update
exports.updateProfissional = async (req, res) => {
  const { id } = req.params;
  try {
    const profissional = await prisma.profissional.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(profissional);
  } catch (error) {
    res.status(404).json({ error: 'Profissional não encontrado.' });
  }
};

// D - Delete
exports.deleteProfissional = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profissional.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Profissional não encontrado.' });
  }
};