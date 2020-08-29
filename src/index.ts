#!/usr/bin/env ts-node
import yargs from 'yargs'
import figlet from 'figlet'
import chalk from 'chalk'
import { exec } from 'child_process'
import fs from 'fs'

const log = console.log

figlet('feal', function (err, data) {
  if (err) {
    log('Something went wrong...')
    console.dir(err)
    return
  }

  log(chalk.blue(data))

  interface Arguments {
    _: Array<string>
  }

  // Catch the arguments
  const args: Arguments = yargs.options({}).argv
  const command = args._[0]
  const value = args._[1]

  if (command === 'init' && typeof value !== 'undefined' && value) {
    log(chalk.white('1/2: Creating new project directory'))
    exec(
      `git clone https://github.com/rafmst/feal ${value}`,
      (error, stdout, stderr) => {
        if (error) {
          return
        }

        log(chalk.white('2/2: Installing dependencies'))
        exec(`cd ${value} && npm i`, (error, stdout, stderr) => {
          if (error) {
            return
          }

          fs.rmdir(`./${value}/.git`, { recursive: true }, (err) => {
            if (err) {
              throw err
            }
          })

          log('')
          log(chalk.green('✔️  Done installing new project'))
          log('')
          log(chalk.white('To run the project:'))
          log(chalk.blue(`cd ${value}`))
          log(chalk.blue(`npm run dev`))
          log('')
        })
      }
    )
  } else {
    log('Check documentation')
  }
})
