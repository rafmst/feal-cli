#!/usr/bin/env ts-node
import chalk from 'chalk'
import { exec } from 'child_process'
import fs from 'fs'

// This is a bit rudimentar, but does the trick
const generateHash = (length: number) => {
  let result = ''
  let characters =
    'ABCDEFGHIJKLMNO!"#¤%&/()=?`´}][{€$£@PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Main command
export const init = (value: string) => {
  console.log(chalk.white('1/4: Creating new project directory'))
  exec(`git clone https://github.com/rafmst/feal ${value}`, (error) => {
    if (error) {
      return
    }

    console.log(chalk.white('2/4: Installing dependencies'))
    exec(`cd ${value} && npm i`, (error) => {
      if (error) {
        return
      }

      fs.rmdir(`./${value}/.git`, { recursive: true }, (err) => {
        if (err) throw err
      })

      console.log(chalk.white('3/4: Generating hash secret'))
      const hash = generateHash(60)
      console.log(chalk.white('4/4: Creating environment configuration file'))
      fs.writeFile(
        `./${value}/.env`,
        `PORT=8910
DATABASE="mongodb://mongodb0.example.com:27017"
SALT_ROUNDS=10
SECRET="${hash}"`,
        (err) => {
          if (err) throw err
        }
      )

      console.log('')
      console.log(chalk.green('✔️  Done installing new project'))
      console.log('')
      console.log(chalk.white('To run the project:'))
      console.log(chalk.blue(`cd ${value}`))
      console.log(chalk.blue(`npm run dev`))
      console.log('')
    })
  })
}
