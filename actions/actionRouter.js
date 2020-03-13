const express = require('express')

const db = require('../data/helpers/actionModel')

const router = express.Router()

//---------all endpoints here-----

router.get('/',(req,res)=>{
    db.get()
    .then(actions=>{
        if(actions){
         res.status(200).json(actions)   
        }else{
        res.status(400).json({error:"issue accessing the actions"})  
        }        
    })
    .catch(err=>{
    console.log(err)
    })

})

//-----getbyid--

router.get('/:id', (req, res)=>{
    const {id:project_id} = req.params
db.get(project_id)
.then(action=>{
    if(action){
        res.status(200).json(action)
    }else{
        res.status(400).json({error:"action is not in the database"})
    }
})
.catch(err=>{
    console.log(err)
})

})

//----post-----

router.post('/', (req,res)=>{
    const{project_id,description,notes}= req.body
    db.insert({project_id,description,notes})
    .then(action=>{
        res.status(201).json(action)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(({error: "new action could not be added!"}))  
    })
})
 //----delete operation

 router.delete('/:id', (req, res)=>{
    const{id} = req.params
    db.remove(id)
   .then(deleted=>{
       if(deleted){
         res.status(204).json({message: "action is removed successfully!"})   
       }else{
        res.status(400).json({error: "issue removing the action"}) 
       }      
   })

})

//---put operation---
router.put('./:id', (req,res)=>{
    const{id} = req.params
    const{project_id,description,notes} = req.body
    db.update(id, {project_id,description,notes})
    .then(updated=>{
        if(updated){
            db.get(id)
                .then(action=>{
                  res.status(200).json(action)
                })
                .catch(err=>{
                    console.log(err)
                 res.status(400).json({error:"action could no be updated"})
             })            
        }
    })
  })





module.exports = router