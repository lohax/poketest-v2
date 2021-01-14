const usePokemons = require('./usePokemons')

test('Must be numeric', () => {
  expect(usePokemons.myFirst).not.toBeNaN()
})
