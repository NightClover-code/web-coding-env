#!/usr/bin/env node
//importing commands
import { program } from 'commander';
import { serveCommand } from './commands/serve';
//executing
program.addCommand(serveCommand);
program.parse(process.argv);
