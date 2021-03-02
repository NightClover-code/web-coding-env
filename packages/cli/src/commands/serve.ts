//importing command & serve & path
import path from 'path';
import { Command } from 'commander';
import { serve } from '@web-coding-env/local-api';
//checking if in production mode
const isProduction = process.env.NODE_ENV === 'production';
//serve command
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      //getting file inside folder if user specifies one
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(`
        Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file
      `);
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log('Port is already is use. Try running on a different port');
      } else {
        console.log('Something went wrong, here is the problem:', err.message);
      }
      process.exit(1);
    }
  });
