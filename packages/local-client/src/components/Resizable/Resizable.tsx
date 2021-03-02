//importing hooks
import { useEffect, useState } from 'react';
//importing resizable component
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
//importing styles
import './resizable.css';
//interfaces
interface ResizableProps {
  direction: 'vertical' | 'horizental';
}
interface DimensionsState {
  width: number;
  height: number;
}
//resizable component
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  //local state
  const [dimensions, setDimensions] = useState<DimensionsState>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  //getting window height and width when resizing
  useEffect(() => {
    //timer
    let timer: any;
    const listener = () => {
      //debouncing top prevent lag when resizing
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        //updating height and width
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    //cleanup
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);
  //resizable conditional props
  let resizableProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableProps = {
      width: Infinity,
      resizeHandles: ['s'],
      height: 300,
      maxConstraints: [Infinity, dimensions.height * 0.9],
      minConstraints: [Infinity, 50],
    };
  } else {
    resizableProps = {
      className: 'resize-horizental',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      minConstraints: [dimensions.width * 0.2, Infinity],
      maxConstraints: [dimensions.width * 0.75, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
