import express from 'express';

import database from '../database';

const superheroes = express.Router();

type Superhero = {
  name: string,
  superpower: string,
  humilityScore: number
}

export const validateSuperHero = (superhero: Superhero) => {
  const nameRegex = /^[a-zA-Z0-9 ]{2,20}$/
  const heroName = superhero.name.trim()
  if (!nameRegex.test(heroName)) {
    return false
  }

  const heroPower = superhero.superpower.trim()
  if (!nameRegex.test(heroPower)) {
    return false
  }
  if (superhero.humilityScore < 1 || superhero.humilityScore > 10) {
    return false
  }

  return true
}

superheroes.post('/', async (req, res) => {
  try {
    const { superhero } = req.body;

    if (validateSuperHero(superhero)) {
      database.superheroes.push(superhero)

      console.log(database.superheroes)
      res.status(200).json({ result: 'success' })
    } else {
      res.status(400).json({error: 'wrong data'})
    }
  } catch (err: any) {
    res.status(400).json({error: err.message})
  }
})

superheroes.get('/', async (req, res) => {
  try {
    const superheroes = database.superheroes.sort((a, b) => a.humilityScore - b.humilityScore)
    res.status(200).json({ superheroes })
  } catch (err: any) {
    res.status(400).json({error: err.message})
  }
})

export default superheroes