
// Se crea un cliente AWS medinate sdk para el servico s3
import {  S3Client,PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
// Las funciones permiten postear asi como listar los objetos que tengo en el BUCKET

import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } from './config.js'

// modulo para trabajar con archivos en nodejs
import fs from 'fs'
//  para acceder a las URL de los archivos en el bucket 
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const clienteWAS = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})
// stream toda la ruta tempFilePath para saber ubicacion del file a subir 
export async function subirFile (file){
    // A medida que lee el archivo 'file' lo va subiendo en este cso al bucket

    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParametros = {
        Bucket: AWS_BUCKET_NAME,
        Key: 'nameinBucket2.png',
        Body : stream
    }
// se guardan los comandos que serviran para subir el archivo
    const comando = new PutObjectCommand(uploadParametros)
    const resultado = await clienteWAS.send(comando)
    console.log(resultado)
}
export async function listarObjBucket () {
    const listar =  new ListObjectsCommand({
        Bucket:AWS_BUCKET_NAME
    })
    const consultarList = await clienteWAS.send(listar)
    return (consultarList.Contents)
    // contents muestra el contenido sin la metadata
}

export async function oneArchivo (nombreABuscar) {
    const comando = new GetObjectCommand({
    Bucket:AWS_BUCKET_NAME,
    Key: nombreABuscar
})
// se envian al cliente los comandos del objeto a buscar en el Bucket
    const respuesta = await clienteWAS.send(comando)
    console.log(respuesta.$metadata)

    return respuesta.$metadata
}

export async function getUrlFile (urlAbuscar) {
    const comando = new GetObjectCommand({
        Bucket:AWS_BUCKET_NAME,
        Key:urlAbuscar
    })
    return await getSignedUrl(clienteWAS,comando,{expiresIn:36000})
}
// esta devueove una URL firmada es decir autorizada por cierto tiempo (3600 segundos)
export async function downloadArchivo(nombreADescargar) {
    const comando = new GetObjectCommand({
    Bucket:AWS_BUCKET_NAME,
    Key:nombreADescargar
})
    const respuesta = await clienteWAS.send(comando)
// El body de la respuesta  lo voy a pasar por pipe a un objeto creado por file system
// Amedida que lo va leyendo se lo va pasando a un objeto del file system fs createWriteStream
  console.log(respuesta) 
    const bodyFile = respuesta.Body.pipe(fs.createWriteStream(`./descargas/${nombreADescargar}.png`))
}