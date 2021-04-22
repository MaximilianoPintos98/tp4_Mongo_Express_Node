const express = require('express');
const router = express.Router();

const Emp = require('../models/empleado');

router.get('/', async (req,res)=> {
    const emps = await Emp.find();
    res.render('index', {
        emps // emps: emps
    })
})

router.post('/agregar', async (req, res) => {

    const emp = new Emp(req.body);

    await emp.save();

    // try {
    //     const newEmp = await Emp.create(req.body)
        
    //     console.log(newEmp)
        
    // } catch (error) {
    //     console.log(error)
    // }
    res.redirect('/');
})

router.get('/activo/:id', async(req,res)=> {
    const { legajo } = req.params;

    const emp = await Emp.findOne(legajo);
    emp.activo = !emp.activo;
    await emp.save();
    res.redirect('/')
})

router.get('/editar/:id', async(req,res) => {
    const emp = await Emp.findOne({legajo: req.params.id});
    res.render('editar', { emp })
})

router.post('/editar/:id', async(req,res) => {

    const emp = await Emp.updateOne({legajo: req.params.id}, req.body);
    console.log(emp)
    res.redirect('/')
})

router.get('/delete/:id', async(req,res) => { 
    const { id } = req.params;

    await Emp.remove({legajo: id})
    res.redirect('/');
})
module.exports = router;