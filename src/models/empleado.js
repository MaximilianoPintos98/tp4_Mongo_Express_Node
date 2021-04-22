const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadoSchema = new Schema({
    legajo: {
        type: String,
        required: true
    },
    apellido: String,
    nombre: String,
    dni: String,
    sector: String,
    fechaIngreso: String,
    activo: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Empleado' , EmpleadoSchema);
