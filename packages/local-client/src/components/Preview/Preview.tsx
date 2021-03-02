//importing hooks & styles
import { useEffect, useRef } from 'react';
import './preview.css';
//interface props
interface PreviewProps {
  code: string;
  bundlingStatus: string;
}
const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="stylesheet" href="./test.css" />
      <style>
        html{
          background-color: #fff;
          font-family: 'Nunito', sans-serif !important;
        }
      </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div class="iframe-content" style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
              throw err;
            }
            window.addEventListener('error', event => {
              event.preventDefault();
              handleError(event.message);
            })
            window.addEventListener('message', event => {
              try{
                eval(event.data);
              }catch(err){
                handleError(err);
              }
            }, false)
        </script>
    </body>
    </html>
  `;
const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  //refs
  const iframeRef = useRef<any>();
  useEffect(() => {
    //resetting the iframe (security purposes)
    iframeRef.current.srcdoc = html;
    //showing it to the user
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className="iframe-wrapper">
      <iframe
        title="preview-page"
        sandbox="allow-scripts"
        src="./test.html"
        srcDoc={html}
        ref={iframeRef}
      />
      {bundlingStatus && <div className="iframe-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
