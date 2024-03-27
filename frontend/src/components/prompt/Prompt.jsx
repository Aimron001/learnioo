import { useState } from 'react'
import './prompt.css'
import { usePromptMutation } from '../../features/api/bookApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function Prompt(props){
    const [showAnswer, setShowAnswer] = useState(false)
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [prompt, {isLoading}] = usePromptMutation()
    async function handleSubmit(e){
        e.preventDefault()
        const res = await prompt({question})
        // console.log(res.data);
        setAnswer(res.data)
        setShowAnswer(true)
    }

    return (
        <div className='prompt'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ask AI anything about the book" onChange={(e) => setQuestion(e.target.value)}/>
                <button><FontAwesomeIcon icon={faComment} /></button>
            </form>
            {showAnswer && (
                <div className='answer-modal'>
                    {/* <p>{`Question: ${answer.question}`}</p> */}
                    <p>{answer.answer}</p>
                    <button onClick={() => setShowAnswer(false)}>Close</button>
                </div>
            )}
        </div>
    )
}