import AI_API from '../utils/request';

async function noteAnalysis(noteText){
    return await AI_API(noteText);
}

export default noteAnalysis;




