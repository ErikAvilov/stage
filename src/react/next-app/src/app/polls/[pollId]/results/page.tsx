"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ErrorMessage, QuestionData, ChoiceData, Choices, BasicResponse } from '../../../interfaces/index';
import { useRouter } from 'next/navigation';
import { headers } from 'next/headers';



const ErrorPage = ({ status, message }: ErrorMessage) => {
	return (
	<div>
		<h2> {message} </h2>
		<strong> status: {status} </strong>
	</div>
	);
};

export default function Detail( {params}: { params: { pollId: number; }; }) {
	const [ htmlContent, setHtmlContent ] = useState<Choices | null>(null);
	const [ error, setError ] = useState<ErrorMessage | null>(null);
	const [ vote, setVote ] = useState<number | null>(null);
	const router = useRouter();

	const handleChange = (e:any) => {
		const { value } = e.target;
		console.log('value set to: ' + value)
		setVote(value);
	};

	const handleSubmit = (e:any) => {
		e.preventDefault();
		console.log('sending: ' + vote)
		axios.post('http://localhost:8000/polls/' + params.pollId + '/vote/', {
			'choice': vote,
		})
		.then((response: AxiosResponse<BasicResponse>) => {
			if (response.data.status === 200) {
				router.push('/polls/');
			}
			else {
				setError({
					message: response.data.message,
					status: response.data.status,
				});
			}
		})
		.catch((error: AxiosResponse<ErrorMessage>) => {
			if ((error)) {
			  setError({
				message: error.message,
				status: error.response?.status,
			  });
			} else {
			  setError({
				message: 'An unknown error occurred',
				status: undefined,
			  });
			}
		  });
	};

	useEffect(() => {
		axios.get('http://localhost:8000/polls/' + params.pollId + '/results/')
		.then((response) => {
			console.log(response.data.results)
			setHtmlContent(response.data.results)
		})
		.catch((error: AxiosResponse<ErrorMessage>) => {
			if ((error)) {
			  setError({
				message: error.message,
				status: error.response?.status,
			  });
			} else {
			  setError({
				message: 'An unknown error occurred',
				status: undefined,
			  });
			}
		  });
	  }, []);
		
		if (error)
			return <ErrorPage message={error.message} status={error.status} />
	return (
		<div>
		<h1>{ 'lol' }</h1>
			<ul>
			{ htmlContent && htmlContent.map((choice: string, index: number) => (
			<li>
				<label htmlFor={ 'choice' + index }></label>
				{ choice.choice_text } - Votes: { choice.votes }
				<input onChange={handleChange} type='radio' name='choice' id={ 'choice' + choice.id } value={choice.id}/>
			</li>
			))}
			</ul>
			<button onClick={handleSubmit} type='submit' value='Vote'>Vote</button>
		</div>
	);
}