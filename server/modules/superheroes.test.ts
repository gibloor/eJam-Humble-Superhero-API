import { validateSuperHero } from "./superheroes"

const validHero = {
 name: "Superman",
 superpower: "Flight", 
 humilityScore: 5
}

describe('Superhero validation', () => {
 test('valid hero data', () => {
   expect(validateSuperHero(validHero)).toBe(true)
 })

 test('special characters in name', () => {
   const heroWithInvalidName = {
     ...validHero,
     name: "Super@man!"
   }
   expect(validateSuperHero(heroWithInvalidName)).toBe(false)
 })

 test('spaces only in name', () => {
   const heroWithEmptyName = {
     ...validHero,
     name: "   "
   }
   expect(validateSuperHero(heroWithEmptyName)).toBe(false)
 })

 test('humility score above 10', () => {
   const heroWithHighScore = {
     ...validHero,
     humilityScore: 11
   }
   expect(validateSuperHero(heroWithHighScore)).toBe(false)
 })

 test('humility score below 1', () => {
   const heroWithLowScore = {
     ...validHero,
     humilityScore: 0
   }
   expect(validateSuperHero(heroWithLowScore)).toBe(false)
 })

 test('special characters in superpower', () => {
   const heroWithInvalidPower = {
     ...validHero,
     superpower: "Super@Power!"
   }
   expect(validateSuperHero(heroWithInvalidPower)).toBe(false)
 })
})