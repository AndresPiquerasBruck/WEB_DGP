const mongoose = require(`mongoose`)

let teacherSchema = new mongoose.Schema(
   {
        nombre: {type: String, required: true},
        usuario: {type: String, required: true},
        contra: {type: String, required: true},
        correo: {type: String, required: true},
        telefono: {type: String, required: true},
        dni: {type: String, required: true},
        accessLevel: {type: Number, required:true}
   },
   {
        collection: `teacher`
   })

module.exports = mongoose.model(`teacher`, teacherSchema)