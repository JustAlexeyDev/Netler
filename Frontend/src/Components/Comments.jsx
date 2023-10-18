import { useState } from 'react'
import Comment from '../Components/Comment'
import { sendComment } from '../scripts/functions'

const Comments = ({post, fetchPosts}) => {
    const [comment, setComment] = useState('')

    const submitComment = (e) => {
        e.preventDefault();
        if (localStorage.getItem('token') !== null) {
            sendComment(post.id, comment);
            fetchPosts();
            setComment('');
        } else {
            console.log('Not authorized');
            alert('Вы не авторизованы')
        }
    }

    return (
        <div className="Comments">
            <p className='Comments-header'>Комментарии:</p>
            <form className="CommentForm" onSubmit={submitComment}>
                <input 
                    type="text"
                    className='CommentInput'
                    placeholder='Введите комментарий'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Отправить</button>
            </form>
            {post.comments.length > 0 && (
                <>
                {post.comments.map(comment => (
                    <Comment key={comment.id} author={comment.author} text={comment.text}  />
                ))}
                </>
            )}
        </div>
    )
}

export default Comments