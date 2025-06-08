const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createAvaliacao = async (req, res) => {
  try {
    const { nota, comentario, autorId, profissionalId } = req.body;
    const avaliacao = await prisma.avaliacao.create({
      data: { nota, comentario, autorId, profissionalId },
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar a avaliação. Verifique os IDs.' });
  }
};


exports.getAllAvaliations = async (req, res) => {
  const avaliacoes = await prisma.avaliacao.findMany({ 
    include: { autor: true, profissional: true } 
  });
  res.json(avaliacoes);
};


exports.getAvaliacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id: Number(id) },
      include: { autor: true, profissional: true }
    });
    if (avaliacao) {
      res.json(avaliacao);
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliação.' });
  }
};

exports.updateAvaliacao = async (req, res) => {
  const { id } = req.params;
  try {
    const avaliacao = await prisma.avaliacao.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(avaliacao);
  } catch (error) {
    res.status(404).json({ error: 'Avaliação não encontrada.' });
  }
};

exports.deleteAvaliacao = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.avaliacao.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Avaliação não encontrada.' });
  }
};