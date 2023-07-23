import { config } from 'dotenv'
import assert from 'node:assert/strict'
import test from 'node:test'

const TOKEN = config().parsed.TOKEN

const BASE_URL = 'http://localhost:5000'
const API = BASE_URL + '/api/'

test('App initialization', async () => {
  const result = await fetch(BASE_URL)
  assert.equal(result.ok, true)
}).catch((error) => console.error(error))

test('Login', async () => {
  const data = {
    username: 'admin',
    password: 'admin'
  }
  const result = await fetch(`${API}auth/login`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  assert.equal(result.ok, true)
}).catch((error) => console.error(error))

test('Should return a jwt token', async () => {
  const data = {
    username: 'admin',
    password: 'admin'
  }

  const result = await fetch(`${API}auth/login`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  const json = await result.json()
  assert.equal(json.token.length > 0, true)
}).catch((error) => console.error(error))

test('Should return users', async () => {
  const result = await fetch(`${API}user/list`, {
    headers: { authorization: `Bearer ${TOKEN}` }
  })
  const json = await result.json()
  assert.equal(json.length > 0, true)
}).catch((error) => console.error(error))
