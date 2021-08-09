import { useRef, useState, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);
  const [hasError, setHasError] = useState(false);

  const validateInput = (input) => input.trim() !== '';

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    const isAuthorValid = validateInput(enteredAuthor);
    const isTextValid = validateInput(enteredText);

    if (isAuthorValid && isTextValid) {
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
    } else {
      setHasError(true);
    }
  };

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <Fragment>
      <Prompt when={isEntering} message={() =>
        'Are you sure you want to leave this page? all your work will be lost.'} />
      <Card>
        <form onFocus={formFocusHandler}
          className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef} ></textarea>
          </div>
          {hasError && <p>Please fill both fields</p>}
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className='btn'>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
