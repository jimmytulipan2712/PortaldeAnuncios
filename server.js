const express = require ('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const anuncioDB = require('./server/model/model');
const axios = require('axios');



app.use(bodyparser.urlencoded({extended:true}))


//Render de archivos ejs con html

app.set("view engine","ejs");

app.use('/css',express.static(path.resolve(__dirname, "assets/css")))


//Ruta default del sitio
app.get('/', (req,res) => {
axios.get ('http://localhost:3000/api/anuncios')
.then(function (response){
    res.render('index',{anuncios:response.data});
})
.catch(err=>{
    res.send(error)
})

}); 

//Ruta para página alta anuncio nuevo
app.get('/new_anuncio', (req,res) => {

    res.render('new_anuncio')
    }); 

//Ruta para sección de Actualización de anuncio existente
app.get('/actualiza-anuncio', (req,res) => {
axios.get('http://localhost:3000/api/anuncios/',{params:{id:req.query.id}})
.then(function(datosAnuncio){
    res.render('actualiza_anuncio',{anuncio:datosAnuncio.data})
    
})
       .catch(err =>{
        res.send(err);
       })
        }); 

/*
app.listen(3000, ()=>{

    console.log('Servidor activo');
})

*/

//API Crear anuncio
app.post('/api/anuncios', async(req,res)=>{
if(!req.body){
    res.status(400).send({message:"Los campos no pueden estar vacíos"});
    return;
}

try{
    const anuncio = await anuncioDB.create(req.body);
    //res.status(200).send(anuncio);
    res.redirect('/');
    }
    
    catch (error){
       res.status(500).send({
          message: error.message
       })
    
    
    }
});

//API obtener todos los anuncios
app.get('/api/anuncios', async(req,res)=>{

    if(req.query.id){
        const id= req.query.id;
anuncioDB.findById(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:"no se encuentra el anuncio solicitado"})
    }else{
        res.send(data);
    }
})
.catch(err=>{
    res.status(500).send({message:"Error"})
})
    }
    else{
anuncioDB.find()
.then(user=>{
    res.send(user)
})
.catch(err=>{

    res.status(500).send({message:err.message||" Error al obtener anuncios"})
})}
});
   /* try{
        const anuncio = await anuncioDB.find({});
        res.status(200).send(anuncio);
        
        }
        
        catch(error){
        
           res.status(500).send({
        
              message:error.message
           })
        }
        
        });


 app.get('/api/anuncios/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const anuncio = await anuncioDB.findById(id);
        res.status(200).send(anuncio);
    }

    catch(error){
        res.status(500).send({
            message:error.message
        })
    }
});

/*/


//API para actualizar anuncio

app.put('/api/anuncios/:id', async(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Los datos no pueden estar vacíos"})
    }
    const id= req.params.id;
    anuncioDB.findByIdAndUpdate(id,req.body,{useFindandModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"No es posible actualizar el anuncio con el id ingresado"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error al actualizar información"})
    })

});


    /*try{
        const {id} = req.params;
        const anuncio = await anuncioDB.findByIdAndUpdate(id, req.body)
  
  
        if(!anuncio){
           return res.status(404).send({message: "Anuncio no encontrado"})
        }
  
        const anuncioActualizado = await anuncioDB.findById(id);
        res.status(200).send(anuncioActualizado);
  
     }
  
  
     catch(error){
  
        res.status(500).json({message:error.message})
     }
  
  });*/


  
//API para eliminar anuncio

app.delete('/api/anuncios/:id',(req,res)=>{

        const id = req.params.id;
    
        anuncioDB.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:'No se puede eliminar el anuncio'})
            }else{
                res.send({
                    message:"Anuncio eliminado correctamente"
                })
            }
        })
.catch(err=>{
    res.status(500).send({
        message:"No se pudo eliminar anuncio"
    })
})
});
        
    
       /* const anuncio = await anuncioDB.findByIdAndDelete(id);
  
        if(!anuncio){
           return res.status(500).send({message: "Anuncio no encontrado"})
        }
        res.status(200).send({message: "Anuncio eliminado correctamente"});
  
     }
  
     catch(error){
  
        return res.status(500).send({message:error.message});
     }
*/


//Conexion a la BD de MOngoDB Atlas en la nube y levantamiento de server en puerto 3000

mongoose.connect("mongodb+srv://admin:admin2712@cluster0.twuiprz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster02").then(()=>{
 console.log('Conexión exitosa a la BD')

 app.listen(3000, () => {

    console.log("Servidor activo en el puerto 3000")
    });
 })
 
 .catch(() => {
console.log('Conexión fallida')


 });


 


