// Learn more about Testing Library and queries here:
// https://testing-library.com/docs/queries/about

import { cleanup } from '@testing-library/react'
import { describe, afterEach } from 'vitest'
// import * as React from 'react'
// import { render, screen, cleanup } from '@testing-library/react'
// import { describe, expect, test, afterEach } from 'vitest'
// import HelloWorld from './components/HelloWorld'
//
describe('Integration test', () => {
  afterEach(cleanup)

//   test('Minimal render display expected text', () => {
//     render(<HelloWorld />)
//     expect(screen.getByText('Hello, World!'))
//   })
//
//   test('Expected greetee is displayed', () => {
//     const greetee = 'Universe'
//     render(<HelloWorld greetee={greetee} />)
//     expect(screen.getByText(`Hello, ${greetee}!`))
//   })
})
