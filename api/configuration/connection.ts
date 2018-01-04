const usuario: string = "dbuser"
const contrasena: string = "dbuser"
const conMLab : string = "ds237967.mlab.com:37967/dbprotein"

const conexionMongo: string = `mongodb://${usuario}:${contrasena}@${conMLab}`

export {conexionMongo}