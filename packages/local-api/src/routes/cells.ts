import express from 'express';
import fs from 'fs/promises';
import path from 'path';
//cell interface
interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
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
        await fs.writeFile(fullPath, '[]', 'utf-8');
        //sending results
        res.send([]);
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
