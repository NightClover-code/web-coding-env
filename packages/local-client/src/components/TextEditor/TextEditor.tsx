//importing hooks & styles
import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import './text-editor.css';
//react markdown editor & types
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
//prop interface
interface TextEditorProps {
  cell: Cell;
}
//text editor component
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  //refs
  const divRef = useRef<HTMLDivElement | null>(null);
  //redux actions
  const { updateCell } = useActions();
  //local State
  const [editing, setEditing] = useState(false);
  //closing editor when clicking out
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //checking if user clicked on the editor
      if (
        divRef.current &&
        event.target &&
        divRef.current.contains(event.target as Node)
      ) {
        return;
      }
      //close editor otherwise
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    //cleanup
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);
  //conditional rendering of MDEditor
  if (editing) {
    return (
      <div ref={divRef} className="text-editor card">
        <div className="card-content">
          <MDEditor
            onChange={v => updateCell(cell.id, v || '')}
            value={cell.content}
          />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="markdown">
      <MDEditor.Markdown source={cell.content || 'Click to edit me!'} />
    </div>
  );
};
export default TextEditor;
