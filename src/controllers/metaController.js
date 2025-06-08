const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMeta = async (req, res) => {
  try {
    const { descricao, concluida, autorId } = req.body;
    const meta = await prisma.meta.create({
      data: { descricao, concluida, autorId },
    });
    res.status(201).json(meta);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar a meta. Verifique o autorId.' });
  }
};

exports.getAllMetas = async (req, res) => {
  const metas = await prisma.meta.findMany({ include: { autor: true } });
  res.json(metas);
};

exports.getMetaById = async (req, res) => {
  const { id } = req.params;
  try {
    const meta = await prisma.meta.findUnique({
      where: { id: Number(id) },
      include: { autor: true }
    });
    if (meta) {
      res.json(meta);
    } else {
      res.status(404).json({ error: 'Meta não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar meta.' });
  }
};

exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: { metas: true, avaliacoes: true } 
    });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

exports.updateMeta = async (req, res) => {
  const { id } = req.params;
  try {
    const meta = await prisma.meta.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(meta);
  } catch (error) {
    res.status(404).json({ error: 'Meta não encontrada.' });
  }
};

exports.deleteMeta = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.meta.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Meta não encontrada.' });
  }
};