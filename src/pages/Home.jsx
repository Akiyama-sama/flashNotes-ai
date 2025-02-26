import { useEffect, useState } from 'react'
import '../App.css'
import SearchIcon from '../assets/search.svg'
import NoteCard from '../components/NoteCard'
import '../styles/NoteCard.css'
import { getNotes, newNote, deleteNote, searchNotes } from '../services/dataStore'
import { useNavigate, useLocation } from 'react-router-dom';

function Home() { 
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从location.state中恢复搜索状态（如果有）
  const [notes, setNotes] = useState(location.state?.notes || []);
  const [searchKeyword, setSearchKeyword] = useState(location.state?.searchKeyword || '');
  const [isSearching, setIsSearching] = useState(location.state?.isSearching || false);
  
  useEffect(() => {
    // 如果有搜索关键字但没有搜索结果，重新执行搜索
    if (location.state?.isSearching && location.state?.searchKeyword && !location.state?.notes) {
        const keyword = location.state.searchKeyword;
        const results = searchNotes(keyword);
        setNotes(results);
        setIsSearching(true);
        setSearchKeyword(keyword);
    } 
    // 如果没有保存的状态，加载所有笔记
    else if (!location.state) {
        loadAllNotes();
    }
  }, [location.state]);
  
  // 加载所有笔记
  const loadAllNotes = () => {
    const notesData = getNotes();
    setNotes(notesData);
    setIsSearching(false);
    setSearchKeyword('');
    
    // 清除路由状态
    navigate('/', { replace: true });
  };

  // 处理创建新笔记的函数
  const handleCreateNote = () => {
    const createdNote = newNote();
    if (createdNote) {
      setNotes(prevNotes => [createdNote, ...prevNotes]);
      
      // 导航到新笔记的详情页，并传递当前搜索状态
      navigate(`/note/${createdNote.id}`, {
        state: { 
          note: createdNote,
          returnToSearch: isSearching,
          searchKeyword,
          searchResults: isSearching ? notes : null
        }
      });
    }
  };
  
  // 处理删除笔记的函数
  const handleDeleteNote = (id) => {
    if (window.confirm('确定要删除这个笔记吗？')) {
      const success = deleteNote(id);
      if (success) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      }
    }
  };
  
  // 处理搜索关键字变化
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  
  // 处理搜索提交
  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      loadAllNotes(); // 如果搜索框为空，加载所有笔记
      return;
    }
    
    const searchResults = searchNotes(searchKeyword);
    setNotes(searchResults);
    setIsSearching(true);
    
    // 更新URL状态，但不改变URL
    navigate('/', { 
      state: { 
        isSearching: true, 
        searchKeyword, 
        notes: searchResults 
      },
      replace: true
    });
  };
  
  // 处理按下回车键搜索
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // 清除搜索，返回所有笔记
  const clearSearch = () => {
    loadAllNotes();
  };

  return (
    <>
      <div className='app'>
        <h1>flashNotes</h1>
        <div className='search'>
          <input 
            type="text"
            placeholder='搜索您的笔记'
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <img 
            src={SearchIcon}
            alt='search'
            onClick={handleSearch}
          />
        </div>
        {isSearching && (
          <div className='search-results'>
            <p>搜索结果: {notes.length} 条笔记</p>
            <button onClick={clearSearch}>清除搜索</button>
          </div>
        )}
      </div>
      
      <div className='notes-container'>
        {/* 创建笔记卡片 - 仅在非搜索状态下显示 */}
        {!isSearching && (
          <div className='card' onClick={handleCreateNote}>
            <div className='create-card-content'>
              <p>点击创建一个新的笔记</p>
            </div>
          </div>
        )}
        
        {/* 笔记列表 */}
        {notes?.length > 0 ? (
          notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote} 
              isSearching={isSearching}
              searchKeyword={searchKeyword}
            />
          ))
        ) : (
          <div className='empty'>
            <h2>没有找到笔记</h2>
            {isSearching && (
              <button onClick={clearSearch}>返回所有笔记</button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Home
