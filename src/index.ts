#!/usr/bin/env ts-node
import yargs from 'yargs'
import figlet from 'figlet'
import chalk from 'chalk'
import { init } from './init'

figlet('feal', function (err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }

  console.log(chalk.blue(data))

  interface Arguments {
    _: Array<string>
  }

  // Catch the arguments
  const args: Arguments = yargs.options({}).argv
  const command = args._[0]
  const value = args._[1]

  if (command === 'init' && typeof value !== 'undefined' && value) {
    init(value)
  } else {
    console.log('Check documentation')
  }
})
