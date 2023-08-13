import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}'
]
export const theme = {
  extend: {}
}
export const darkMode = 'class'
export const plugins = [nextui()]
