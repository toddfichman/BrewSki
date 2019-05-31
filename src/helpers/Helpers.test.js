import {abbrState} from './abbrToState'


test('State Abbreviation to Name', () => {
  const state = abbrState('WY', 'name')
  expect(state).toBe('Wyoming')
})


test('State Name to Abbreviation', () => {
  const state = abbrState('North Dakota', 'abbr')
  expect(state).toBe('ND')
})
