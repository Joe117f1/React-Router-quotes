import { Fragment, useEffect } from 'react';
import { Link, useParams, Route, useRouteMatch } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    },
        [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    };

    if (status === 'error') {
        return <p className='centered focused'>{error}</p>;
    };

    if (!loadedQuotes.text) {
        return <HighlightedQuote text='No quote found' author='' />
    };

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Load comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;