import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Input from './components/Input';

type Superhero = {
  name: string,
  superpower: string,
  humilityScore: number
}

const ENV_URL = 'http://localhost:3001/'

function App() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([])

  const [newHeroName, setNewHeroName] = useState('')
  const [newHeroPower, setNewHeroPower] = useState('')
  const [newHeroHumilityScore, setNewHeroHumilityScore] = useState(1)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const getSuperheroes = async () => {
      try {
        const result = await axios.get(`${ENV_URL}superheroes`)
        console.log(result.data.superheroes)
        setSuperheroes(result.data.superheroes)
      } catch (err) {
        console.error(err)
      }
    }

    getSuperheroes()
  }, [])

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z0-9 ]{2,20}$/
    const heroName = newHeroName.trim()
    if (!nameRegex.test(heroName)) {
      setFormError('invalid name')
      return false
    }

    const heroPower = newHeroPower.trim()
    if (!nameRegex.test(heroPower)) {
      setFormError('invalid power')
      return false
    }
    if (newHeroHumilityScore < 1 || newHeroHumilityScore > 10) {
      setFormError('invalid humility score')
      return false
    }

    setFormError('')
    return true
  }

  const onAddNewCharacter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (validateForm()) {
      const newSuperhero: Superhero = { name: newHeroName, superpower: newHeroPower, humilityScore: newHeroHumilityScore }
      console.log(newSuperhero)
      const updatedSuperHeroes = [...superheroes, newSuperhero].sort((a, b) => a.humilityScore - b.humilityScore)
      setSuperheroes(updatedSuperHeroes)

      try {
        await axios.post(`${ENV_URL}superheroes`, { superhero: newSuperhero})
      } catch (err) {
        console.error(err)
      }
    }
  }

  const HumilityScoreRegulator = (value: string) => {
    const score = Number(value)
    const fixedValue =  score < 1 ? '1' : score > 10 ? '10' : value

    return fixedValue
  }

  return (
    <div className="app">
      <div className="app__container">
        <div className='app__superheroes'>
          {superheroes.map((superhero, index) => (
            <div key={`${superhero.name}-${index}`} className='app__superheroe'>
              <p className='app__superheroe_name'>
                {superhero.name}
              </p>
              <p>
                {superhero.superpower}
              </p>
              <p>
                {superhero.humilityScore}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={onAddNewCharacter} className='app_add-new-hero'>
          <p>Add new hero</p>
          <Input value={newHeroName} onChange={setNewHeroName} required={true} />
          <Input value={newHeroPower} onChange={setNewHeroPower} required={true} />
          <Input value={newHeroHumilityScore} onChange={value => setNewHeroHumilityScore(Number(value))} required={true} type='number' regulator={HumilityScoreRegulator} />
          <button type='submit'>
            Add hero
          </button>
          <p className='app_add-new-hero_error'>
            {formError}
          </p>
        </form>

      </div>
    </div>
  );
}

export default App;
