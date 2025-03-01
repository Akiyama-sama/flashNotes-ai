import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import '../styles/AICard.css';

function AICard({ aiContent }) {
    const [displayContent, setDisplayContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    useEffect(() => {
        if (!aiContent) return;
        
        // 重置显示内容
        setDisplayContent('');
        setIsTyping(true);
        
        let index = 0;
        const totalLength = aiContent.length;
        
        // 创建打字效果的定时器
        const typingInterval = setInterval(() => {
            if (index < totalLength) {
                setDisplayContent(prev => prev + aiContent.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 15); // 调整速度，数值越小越快
        
        // 清理函数
        return () => {
            clearInterval(typingInterval);
        };
    }, [aiContent]);
    
    return (
        <div className='ai-card'>
            <div className='ai-card-header'>
                <div className='ai-card-title'>AI分析</div>
                {isTyping && <div className='typing-indicator'>生成中...</div>}
            </div>
            <div className='ai-card-content'>
                <ReactMarkdown>{displayContent}</ReactMarkdown>
            </div>
        </div>
    );
}

AICard.propTypes = {
    aiContent: PropTypes.string
};

AICard.defaultProps = {
    aiContent: ''
};

export default AICard;
