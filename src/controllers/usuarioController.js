const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUsuario = async (req, res) => {

  try {
    const usuario = await prisma.usuario.create({ data: req.body });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar o usuário.' });
  }
};

exports.getAllUsuarios = async (req, res) => {

  const usuarios = await prisma.usuario.findMany({ 
    include: { metas: true, avaliacoes: true } 
  });
  res.json(usuarios);
};

exports.getUsuarioById = async (req, res) => {

  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: { metas: true, avaliacoes: true }
  });
  usuario ? res.json(usuario) : res.status(404).json({ error: 'Usuário não encontrado.' });
};

exports.updateUsuario = async (req, res) => {

  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
};

exports.deleteUsuario = async (req, res) => {
    
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); 
  } catch (error) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
  }
};