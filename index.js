import express from 'express'

import fileupload from 'express-fileupload'


import { subirFile, listarObjBucket, oneArchivo, downloadArchivo, getUrlFile } from './s3.js'


const app = express()
// EL PROBLEMA ESTA EN QUE CUANDO fileupload SUBE EL 'file' EL NOMBRE DEL OBJETO  ES UNDEFINED HAY QUE DEFINIR EL NOMBRE
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'./archivosTempSubidos'
}))
// este midlleware añade una propiedad a req.files que permite ver los archivos que pasan por las rutas


    //  useTempFiles:true, usar archivos temporales si, en que dir guardarlos: tempFileDir:'./archivosTemp'
app.get('/listarBucket', async (req,res)=>{
    const listado = await listarObjBucket()
    res.json({ listado })
})
// se puede pasar info del objeto e.g la KEY para que sirva de parametro en la busqueda
app.get('/listarBucket/:info', async (req,res)=>{
    const parametro = req.params.info    
    const respuesta = await oneArchivo(parametro)
    res.json(respuesta)
})
app.get('/download/:info', async (req,res)=>{
    const parametro = req.params.info    
    const respuesta = await downloadArchivo(parametro)
    res.send('Descargado')
})

// subirFile toma los files  del req en el body body(form en este caso) y al hacer el post envia este al BUCKET
app.post('/sendfiles', async (req,res)=>{
    console.log(req.files)
    const resultado = await subirFile(req.files.file)
    res.json({resultado})
})

app.get('/getUrlFile/:keyBucket',async (req,res)=>{
    const parametro = req.params.keyBucket
    const resultURL = await getUrlFile(parametro)
    console.log(resultURL)
    res.json({
        url: resultURL
    })
}) 
// se podriacon ejs  renderizar instalando 


app.listen(process.env.PORT || 3000)

console.log("Escuchando por el puerto 3000")