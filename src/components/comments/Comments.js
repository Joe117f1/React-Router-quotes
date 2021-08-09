import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  },
    [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let commentsToDisplay;

  if (status === 'pending') {
    commentsToDisplay = <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
    commentsToDisplay = <CommentsList comments={loadedComments} />
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    commentsToDisplay = <p className='centered'>No comments were added yet</p>
  }

  if (status === 'error') {
    commentsToDisplay = <div className='centered'>
      {error}
    </div>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm
        quoteId={quoteId}
        onAddComment={addedCommentHandler} />}
      {commentsToDisplay}
    </section>
  );
};

export default Comments;
