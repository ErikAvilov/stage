import logo from './logo.svg';
import './App.css';

import { useState, useEffect, Component } from 'react';
import { Routes, Route, BrowserRouter, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Button = ({ click, text }) => (
  <div>
    <button onClick={click}>{text}</button>
  </div>
);

const ErrorPage = ({ message, code }) => (
  <div>
    <h1> { message } </h1>
    <strong>status code: { code } </strong>
  </div>
);

const Polls = () => {
  const [htmlContent, setHtmlContent] = useState([]);
  const [error, setError ] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/polls/')
    .then((response) => {
      const pollsData = response.data.context.map((element) => ({
        id: element.id,
        question: element.question_text,
      }))
      setHtmlContent(pollsData);
      })
    .catch((error) => {
      console.error("There was an error fetching the polls!", error);
      setError({ message: error.code, code: error.response?.status || 400 });
    })
  }, []);

  if (error)
    return <ErrorPage message={error.message} code={error.code} />
  
  return (
    <div>
      <h1>Polls</h1>
      { htmlContent.map((poll) => (
        <li key={poll.id}>
          <Link to={`/polls/${poll.id}/results`}> { poll.question } </Link>
        </li>
        )) 
      }
    </div>
  );
};

const Question = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState(null);
  const id = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/polls/' + id.id)
    .then((response) => {
      console.log(response.data);
      setHtmlContent(response.data.message)
    })
  })
  return (
    <div>
      <h1>{ htmlContent }</h1>
    </div>
  );
}

const Results = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState(null);
  const id = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/polls/' + id.id + '/results/')
    .then((response) => {
      console.log(response.data);
    })
  })
  return (
    <div>
      <h1>{ htmlContent }</h1>
    </div>
  );
}

const Home = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Link to="/polls/">Polls</Link>
        <Link to="/polls/1">Question</Link>
      </header>
    </div>
  );
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/polls/" element={<Polls />} />
          <Route path="/polls/:id/" element={<Question />} />
          <Route path="/polls/:id/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
