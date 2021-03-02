import { useTypedSelector } from './useTypedSelector';
//cumulative code hook
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(({ cells: { order, data } }) => {
    const orderedCells = order.map(id => data[id]);
    //operatioanal show function
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      //show function
      var show = (value) => {
        const root = document.querySelector('#root');
        if(value.$$typeof && value.props){
          _ReactDOM.render(value, root);
        }else{
          root.innerHTML = JSON.stringify(value);
        }
      }
      `;
    //*NON* operational show function
    const showFuncNotOp = 'var show = () => {}';
    //cumulated code from all cells
    const cumulativeCode = [];
    //joining code from all cells
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNotOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join(' \n');
};
