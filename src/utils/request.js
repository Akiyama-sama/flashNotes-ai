import axios from 'axios';

async function AI_API(noteText) {
    try {
        const response = await axios.post('http://localhost:8000/api/ai/analyze', { noteText });
        const result = response.data.result;
        console.log('AI响应成功');
        return result;
    } catch (error) {
        console.error('AI请求失败:', error);
        return "抱歉，AI分析过程中出现了错误。请稍后再试。";
    }
}

export default AI_API;
