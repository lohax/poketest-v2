import { gql } from '@apollo/client'

export const GET_POKEMON_INFO = gql`
  query pokemons(
    $first: Int! #, $name: String!
    ) {
    pokemons(
      first: $first #, name: $name
      ) {
      id
      number
      name
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
        attacks {
            fast {
              name
              type
              damage
            }
            special {
              name
              type
              damage
            }
          }

        evolutions {
          id
          number
          name
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
          attacks {
            fast {
              name
              type
              damage
            }
            special {
              name
              type
              damage
            }
          }
          evolutions {
            id
            number
            name
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
            attacks {
              fast {
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
          }
        }
      }
    }
  }
`
