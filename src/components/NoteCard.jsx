import '../styles/NoteCard.css'
import { useNavigate } from 'react-router-dom';

function NoteCard({ note }) {
    const navigate = useNavigate();
    const displayText = note.text?.length > 20 ? note.text.slice(0,20) : note.text;

    const handleClick = () => {
        navigate(`/note/${note.id}`, {
            state: { note: note }
        });
    };

    return (
        <div className="card" onClick={handleClick}>
            <div>
                {displayText}
            </div>
            <div>
                {note.createTime}
            </div>
        </div>
    )
}

export default NoteCard