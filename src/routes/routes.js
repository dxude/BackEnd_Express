const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const profissionalController = require('../controllers/profissionalController');
const metaController = require('../controllers/metaController');
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/', (req, res) => res.send('API do projeto funcionando!'));

router.post('/usuarios', usuarioController.createUsuario);
router.get('/usuarios', usuarioController.getAllUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById); 
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);


router.post('/profissionais', profissionalController.createProfissional);
router.get('/profissionais', profissionalController.getAllProfissionais);
router.get('/profissionais/:id', profissionalController.getProfissionalById); 
router.put('/profissionais/:id', profissionalController.updateProfissional);
router.delete('/profissionais/:id', profissionalController.deleteProfissional);


router.post('/metas', metaController.createMeta);
router.get('/metas', metaController.getAllMetas);
router.get('/metas/:id', metaController.getMetaById); 
router.put('/metas/:id', metaController.updateMeta);
router.delete('/metas/:id', metaController.deleteMeta);

router.post('/avaliacoes', avaliacaoController.createAvaliacao);
router.get('/avaliacoes', avaliacaoController.getAllAvaliations);
router.get('/avaliacoes/:id', avaliacaoController.getAvaliacaoById); 
router.put('/avaliacoes/:id', avaliacaoController.updateAvaliacao);
router.delete('/avaliacoes/:id', avaliacaoController.deleteAvaliacao);

module.exports = router;