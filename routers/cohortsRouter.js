const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/cohort.db3',
    },
    useNullAsDefault: true,
  };

  const db = knex(knexConfig)

  //Get all Cohorts
  router.get('/', (req, res) => {
      db('cohorts').then(cohort => {
          res.status(200).json(cohort)
      }).catch(error => {
          res.status(500).json(error)
      })
  })

  //Get a Cohort by ID
  router.get('/:id', (req, res) => {
      const { id } = req.params
      db('cohorts').where({ id })
      .first()
      .then(cohort => {
          if(!cohort){
            res.status(404).json({ errorMessage: 'It aint here lol' })
          }else{
            res.status(200).json(cohort)
          }
      }).catch(error => {
          res.status(500).json(error)
      })
  })

  //Post a Cohort
  router.post('/', (req, res) => {
      db('cohorts').insert(req.body).then(ids => {
          const id = ids[0];
          db('cohorts').where({ id }).first().then(cohort => {
              res.status(201).json(cohort)
          }).catch(error => {
              res.status(500).json({error: "There was an error adding this cohort to the database."})
          })
      })
  })

  //Update a Cohort
router.put('/:id', (req, res) => {
    const { id } = req.params
    db('cohorts').where({ id }).update(req.body).then(count => {
        if(count > 0){
            res.status(200).json(count)
        }else{
            res.status(404).json({ errorMessage: "The cohort with that ID does not exist"})
        }
    }).catch(error => {
        res.status(500).json({error: "There was an error updating that ID in the database"})
    })
})

//Delete a Cohort
router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('cohorts').where({ id }).del(count => {
        if( count > 0){
            res.status(204).end()
        }else{
            res.status(404).json({errorMessage: "The cohort you are trying to remove does not exist"})
        }
    }).catch(error => {
        res.status(500).json({ error: "There was an error removing that cohort from the database"})
    })
})

// router.get('/:id/students', (req,res) => {
//     const { id } = req.params
//     db.select('*')
//     .from('cohorts')
//     .where({ id })
//     .join('students', {'id':  'cohort_id'})
//     .then(student => {
//         res.status(200).json(student)
//     }).catch(error => {
//         res.status(500).json(error)
//     })
// })

  

module.exports = router