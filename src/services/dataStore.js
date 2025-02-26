const initialNotes=[
    {
      id:0,
      title:'',
      createTime:'2025-2-20',
      text:'这是我的第一篇笔记'
    }
  ];
//从localstorage获取本地所有笔记的方法
const getNotes = () => {
    try {
        const storedNotes = localStorage.getItem('notes');
        if (!storedNotes) {
            // 如果没有存储的数据，保存并返回初始数据
            localStorage.setItem('notes', JSON.stringify(initialNotes));
            return initialNotes;
        }
        // 解析存储的数据并确保它是一个数组
        const parsedNotes = JSON.parse(storedNotes);
        return Array.isArray(parsedNotes) ? parsedNotes : initialNotes;
    } catch (error) {
        console.error('Error getting notes:', error);
        return initialNotes;
    }
};
//保存单个笔记的方法
function saveNote(updatedNote){
  const notes=getNotes();
  const index=notes.findIndex(note => note.id === updatedNote.id)
  if(index!==-1){
    //如果在localstorage里面有，就保存
    notes[index]=updatedNote;
    localStorage.setItem('notes',JSON.stringify(notes))
  }
}
// 获取单个笔记的方法
const getNote = (id) => {
  const notes = getNotes();
  return notes.find(note => note.id === id);
};
// 创建新笔记的方法
const newNote = () => {
  try {
    // 获取现有笔记
    const notes = getNotes();
    
    // 计算新笔记的ID (当前最大ID + 1)
    const maxId = notes.length > 0 
      ? Math.max(...notes.map(note => note.id)) 
      : -1;
    const newId = maxId + 1;
    
    // 创建新笔记对象
    const newNoteObj = {
      id: newId,
      title: '',
      createTime: new Date().toISOString().split('T')[0],
      text: '这是一个新笔记'
    };
    
    // 将新笔记添加到笔记列表
    notes.push(newNoteObj);
    
    // 保存更新后的笔记列表到localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // 返回新创建的笔记对象
    return newNoteObj;
  } catch (error) {
    console.error('创建新笔记失败:', error);
    return null;
  }
};
// 删除笔记的方法
const deleteNote = (id) => {
  try {
    const notes = getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    return true;
  } catch (error) {
    console.error('删除笔记失败:', error);
    return false;
  }
};
// 搜索笔记的方法
const searchNotes = (keyword) => {
  try {
    if (!keyword || keyword.trim() === '') {
      return getNotes(); // 如果关键字为空，返回所有笔记
    }
    
    const notes = getNotes();
    const lowerKeyword = keyword.toLowerCase();
    
    // 模糊匹配note.text
    return notes.filter(note => 
      note.text && note.text.toLowerCase().includes(lowerKeyword)
    );
  } catch (error) {
    console.error('搜索笔记失败:', error);
    return [];
  }
};
  
export { getNotes, saveNote, getNote, newNote, deleteNote, searchNotes };