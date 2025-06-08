const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMetaForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { descricao } = req.body;
    const meta = await prisma.meta.create({
      data: { descricao, autorId: Number(userId) },
    });
    res.status(201).json(meta);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a meta.' });
  }
};

exports.createAvaliacaoForProfissional = async (req, res) => {
  try {
    const { profId } = req.params;
    const { nota, comentario, autorId } = req.body;
    const avaliacao = await prisma.avaliacao.create({
      data: { nota, comentario, autorId, profissionalId: Number(profId) },
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a avaliação.' });
  }
};