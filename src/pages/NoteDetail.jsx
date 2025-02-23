import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Back from '../assets/back.svg'
import '../styles/NoteDetail.css'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const note = location.state?.note || { text: '' }; // 
    const [markdown, setMarkdown] = useState(note.text);
    const [isEditMarkdown,setIsEditMarkdown]=useState(true);

    function handlerChangeMarkdown(e){
        setMarkdown(e.target.value)
    }
    return (
        <div className="note-detail">
            <div className='header'>
              <img src={Back}
              onClick={() => navigate('/')}
              alt='back'
            />
            </div>
            
           <div className='note-detail-container'>
                <h1>笔记 {id} 的详情</h1>
                <br />
                <div className='markdown-area'>
                    <div className='tools'>
                    <button onClick={()=>{setIsEditMarkdown(!isEditMarkdown)}}>切换</button>
                    </div>
                
                    {isEditMarkdown?
                    (
                     <textarea
                        className="markdown-editor"
                        value={markdown}
                        onChange={handlerChangeMarkdown}
                        placeholder="输入 Markdown..."
                    />
                    )
                    :(
                     <div className="markdown-preview">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                     </div>

                    )}
                </div>
               
           </div>
            
        </div>
    )
}

export default NoteDetail