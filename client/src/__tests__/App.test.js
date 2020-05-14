/* global test expect */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

test('renders header', () => {
  const { getByText } = render(<App />)
  const header = getByText(/Create your Lightfeather Code Challenge Account/i)
  expect(header).toBeInTheDocument()
})

test('renders username label', () => {
  const { getByText } = render(<App />)
  const field = getByText(/Username:/i)
  expect(field).toBeInTheDocument()
})

test('renders email label', () => {
  const { getByText } = render(<App />)
  const field = getByText(/Email:/i)
  expect(field).toBeInTheDocument()
})

test('renders password label', () => {
  const { getByText } = render(<App />)
  const field = getByText(/^(Confirm )Password:/i)
  expect(field).toBeInTheDocument()
})

test('renders confirm password label', () => {
  const { getByText } = render(<App />)
  const field = getByText(/Confirm Password:/i)
  expect(field).toBeInTheDocument()
})

test('renders button text', () => {
  const { getByText } = render(<App />)
  const field = getByText(/Sign Up!/i)
  expect(field).toBeInTheDocument()
})

// etc
