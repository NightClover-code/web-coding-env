import express from 'express';
import fs from 'fs/promises';
import path from 'path';
//cell interface
interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
//default content
const defaultCells = [{"content":"# Web Coding Environment\nThis is an interactive coding environment. You can write Javascript, see it compiled, and write comprehensive documention / notes using a Markdown Editor.\n\n- Click any text cell to edit its content (including this one)\n-  The code you write is shared by other cells, if you define a variable in cell #1, you can use it in all the other cells!\n- You can show any number, string, object or even a React Component by calling the `show` function. This is a function that is built into this environment. Call show multiple times to render multiple values\n- Every cell has buttons to change its order between other cells, as well as a button to delete the cell\n- Code cells can be resized horizentally and vertically, text cells can be resized horizentally\n- Add new cells by hovering over the divider between each cell\n- Code bundling & transpiling is done automatically every 500ms, you can execute javascript safely in the browser, and you can also import `npm` modules just as you would do it in you local text-editor\n- Format your code by clicking on the format button in a code cell\n\nAll the changes you make in this environment are saved by default in the `notebook.js` file, which gives you the possibility to share you documented code with your relatives or your collegues. You can also have multiple files containing different content, eg. if you run `npx web-coding-env serve test.js`, all your changes would be saved in `test.js`","id":"1cf09272-b777-4a4b-8aca-10540e453d5d","type":"text"},{"content":"//example of a react component\r\nimport { useState } from 'react';\r\n//counter\r\nconst Counter = () => {\r\n  //local state\r\n  const [counter, setCounter] = useState(0);\r\n  return (\r\n    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>\r\n      <button onClick={() => setCounter(counter + 1)}>Click Me!</button>\r\n      <span>Counter: {counter}</span>\r\n    </div>\r\n  );\r\n};\r\n//use the show function to render values on the screen\r\nshow(<Counter />);","id":"f46d4161-d563-4936-96a1-623977734d9d","type":"code"},{"content":"//app component\r\nconst App = () => {\r\n  return (\r\n    <div>\r\n      <h2>Hello to counter from App!</h2>\r\n      {/*we can use counter in here because it was already defined in the previous cell! */}\r\n      <Counter />\r\n    </div>\r\n  );\r\n};\r\n//showing app\r\nshow(<App />);","id":"c4ff0fa2-6b4e-46b8-8cc5-b421380d207f","type":"code"}];
//exporting router function
export const createCellsRouter = (filename: string, dir: string) => {
  //using router
  const router = express.Router();
  //parsing
  router.use(express.json());
  const fullPath = path.join(dir, filename);
  //routes
  router.get('/cells', async (req, res) => {
    try {
      //read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      //sending results
      res.send(result);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, `'${defaultCells}'`, 'utf-8');
        //sending results
        res.send(defaultCells);
      } else {
        throw err;
      }
    }
  });
  router.post('/cells', async (req, res) => {
    //format the cells content from the request
    const { cells }: { cells: Cell[] } = req.body;
    //write cells into a file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    //sending response
    res.send({ status: 'ok' });
  });
  return router;
};
