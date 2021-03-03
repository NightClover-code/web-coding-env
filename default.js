/*
# Web Coding Environment\nThis is an interactive coding environment. You can write Javascript, see it compiled, and write comprehensive documention / notes using a Markdown Editor.\n\n\n- Click any text cell to edit its content (including this one)\n- The code you write is shared by other cells, if you define a variable in cell #1, you can use it in all the other cells!\n- You can show any number, string, object or even a React Component by calling the `show` function. This is a function that is built into this environment. Call show multiple times to render multiple values\n- Every cell has buttons to change its order between other cells, as well as a button to delete the cell\n- Code cells can be resized horizentally and vertically, text cells can be resized horizentally\n- Add new cells by hovering over the divider between each cell\n- Code bundling & transpiling is done automatically every 500ms, you can execute javascript safely in the browser, and you can also import `npm` modules just as you would do it in you local text-editor\n- Format your code by clicking on the format button in a code cell\n\nAll the changes you make in this environment are saved by default in the `notebook.js` file, which gives you the possibility to share you documented code with your relatives or your collegues. You can also have multiple files containing different content, eg. if you run `npx web-coding-env serve test.js`, all your changes would be saved in `test.js`
*/
//example of a react component
import { useState } from 'react';
//counter
const Counter = () => {
  //local state
  const [counter, setCounter] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={() => setCounter(counter + 1)}>Click Me!</button>
      <span>Counter: {counter}</span>
    </div>
  );
};
//use the show function to render values on the screen
show(<Counter />);

//cell 2
//app component
const App = () => {
  return (
    <div>
      <h2>Hello to counter from App!</h2>
      {/*we can use counter in here because it was already defined in the previous cell! */}
      <Counter />
    </div>
  );
};
//showing app
show(<App />);
