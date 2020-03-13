const express = require('express')

const db = require('../data/helpers/projectModel')

const router = express.Router()

//---------all endpoints here-----

// GET request(for all)----
 
router.get('/',(req,res)=>{    
    db.get()
    .then(projects=>{
        if(projects){
         res.status(200).json(projects)   
        }else{
        res.status(400).json({error:"issue accessing the projectlist"})  
        }        
    })
    .catch(err=>{
    console.log(err)
    })
})

//====get(id)
router.get('/:id', (req, res)=>{
    const {id} = req.params
db.get(id)
.then(project=>{
    if(project){
        res.status(200).json(project)
    }else{
        res.status(400).json({error:"project is not in the database"})
    }
})
.catch(err=>{
    console.log(err)
})

})

 //-----post----
 router.post('/', (req,res)=>{
    const{name,description}= req.body
    db.insert({name,description})
    .then(project=>{
        res.status(201).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(({error: "new project could not be added!"}))  
    })
})

//----delete-----

router.delete('/:id', (req, res)=>{
    const{id} = req.params
    db.remove(id)
   .then(deleted=>{
       if(deleted){
         res.status(204).json({message: "project is removed successfully!"})   
       }else{
        res.status(400).json({error: "issue removing the project"}) 
       }      
   })

})

//-----------put---

  router.put('./:id', (req,res)=>{
      const{id} = req.params
      const{name,description}= req.body
      db.update(id, {name,description})
      .then(updated=>{
          if(updated){
              db.get(id)
                  .then(project=>{
                    res.status(200).json(project)
                  })
                  .catch(err=>{
                      console.log(err)
                   res.status(400).json({error:"project could no be updated"})
                  })             
          }
      })
    })

module.exports = router