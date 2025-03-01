import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Back from '../assets/back.svg';
import { getNote, saveNote } from '../services/dataStore';
import '../styles/NoteDetail.css';
import AICard from '../components/AICard';
import noteAnalysis from '../services/aiService';
function NoteDetail() {
    const { id } = useParams();  // 获取URL中的笔记id
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
   
    
    // 从location.state中获取搜索状态
    const returnToSearch = location.state?.returnToSearch;
    const searchKeyword = location.state?.searchKeyword;

    // 使用空对象或路由状态作为初始值
    const [note, setNote] = useState(location.state?.note || { 
        id: parseInt(id),
        title: '',
        createTime: new Date().toISOString().split('T')[0],
        text: '',
        aiContent:''
    });
    const [isEditMarkdown, setIsEditMarkdown] = useState(true);
    const [isAIActive, setIsAIActive] = useState(note.aiContent && note.aiContent.length !== 0);
    const [isAILoading, setIsAILoading] = useState(false);

    
    useEffect(() => {
        const loadNote = async () => {
            try {
                const currentNote = await getNote(parseInt(id));
                if (currentNote) {
                    setNote(currentNote);
                }
            } catch (error) {
                console.error('加载笔记失败:', error);
            } finally {
                setLoading(false);
            }
        };
        loadNote();
    }, [id]);

    if (loading) return <div>加载中...</div>;

    // 处理文本变化并实时保存
    function handlerChangeMarkdown(e) {
        const updatedNote = {
            ...note,
            text: e.target.value
        };
        setNote(updatedNote);  // 更新本地状态
        saveNote(updatedNote); // 保存到 localStorage
    }

    // 处理AI按钮点击
    const handleAI = async () => {
        setIsAIActive(true);
        setIsAILoading(true);
        
        try {
            const result = await noteAnalysis(note.text);
            const updatedNote = {
                ...note,
                aiContent: result
            };
            setNote(updatedNote);  // 更新本地状态
            saveNote(updatedNote); // 保存到 localStorage
        } catch (error) {
            console.error('AI分析失败:', error);
        } finally {
            setIsAILoading(false);
        }
    };

    // 处理返回按钮点击
    const handleBack = () => {
        if (returnToSearch && searchKeyword) {
            // 返回到搜索结果页面，但不传递搜索结果
            // 而是让Home组件重新执行搜索
            navigate('/', { 
                state: { 
                    isSearching: true, 
                    searchKeyword,
                    // 不传递notes，让Home组件重新搜索
                }
            });
        } else {
            // 普通返回
            navigate('/');
        }
    };

    return (
        <div className="note-detail">
            {/* 顶部导航栏 */}
            <div className='header'>
                <img 
                    src={Back}
                    onClick={handleBack}
                    alt='back'
                />
            </div>
            
            {/* 笔记内容区域 */}
            <div className='note-detail-container'>
                
                <div className='markdown-area'>
                    {/* 工具栏 */}
                    <div className='tools'>
                        <button 
                            className='button' 
                            onClick={handleAI} 
                            disabled={isAILoading}
                        >
                            {isAILoading ? '分析中...' : '一键AI'}
                        </button>
                        <button 
                            className='button' 
                            onClick={() => setIsEditMarkdown(!isEditMarkdown)}
                        >
                            {isEditMarkdown ? '预览' : '编辑'}
                        </button>
                    </div>
                
                    {/* 编辑器/预览切换 */}
                    {isEditMarkdown ? (
                        <textarea
                            className="markdown-editor"
                            value={note.text}
                            onChange={handlerChangeMarkdown}
                            placeholder="输入 Markdown..."
                        />
                    ) : (
                        <div className="markdown-preview">
                            <ReactMarkdown>{note.text}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
            {/* AI卡片显示区域 */}
            {isAIActive && 
                <div className='ai-container'>
                    <AICard aiContent={note.aiContent}/>
                </div>
            }
        </div>
    );
}

export default NoteDetail;