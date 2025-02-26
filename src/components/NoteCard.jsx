import '../styles/NoteCard.css'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../assets/delete.svg'

function NoteCard({ note, onDelete, isSearching, searchKeyword }) {
    if (!note) return null;

    const navigate = useNavigate();
    
    const handleClick = () => {
        // 获取当前页面上所有笔记（如果在搜索状态下）
        const searchResults = isSearching ? 
            document.querySelectorAll('.card:not(.create-card-content)') : null;
            
        navigate(`/note/${note.id}`, { 
            state: { 
                note,
                returnToSearch: isSearching,
                searchKeyword,
                // 传递搜索关键字，而不是搜索结果
                // 返回时会重新执行搜索
            }
        });
    };
    
    // 处理删除事件
    const handleDelete = (e) => {
        e.stopPropagation(); // 阻止事件冒泡，防止触发卡片点击
        if (onDelete) {
            onDelete(note.id);
        }
    };

    return (
        <div className="card" onClick={handleClick}>
            <div>{note.text?.substring(0, 50)}...</div>
            <div className='footer'>
                <div className='create-time'>{note.createTime}</div>
                <img 
                    src={DeleteIcon} 
                    alt="delete" 
                    onClick={handleDelete} 
                />
            </div>
            
        </div>
    );
}

export default NoteCard