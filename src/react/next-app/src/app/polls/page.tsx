"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ErrorMessage, QuestionData } from '../interfaces/index';
import { useRouter } from 'next/navigation';
import "../styles/list.css";

const ErrorPage = ({ status, message }: ErrorMessage) => {
	return (
	<div>
		<h1> {message} </h1>
		<strong> status: {status} </strong>
	</div>
	);
};

export default function Polls() {
	const [ htmlContent, setHtmlContent ] = useState<QuestionData[]>([]);
	const [ error, setError ] = useState<ErrorMessage | null>(null);
	const router = useRouter();
	const navigateToDetail = (id: number) => {
		router.push(`/polls/${id}`);
	}

	useEffect(() => {
		axios.get('http://localhost:8000/polls/')
		.then((response: AxiosResponse<QuestionData[]>) => {
			console.log(response.data.results);
		setHtmlContent(response.data.results);
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
			<h1>Polls</h1>
			{ htmlContent.map((poll: QuestionData) => (
				<li key={poll.id} onClick={() => navigateToDetail(poll.id)}>
						{poll.question_text}
				</li>
			))}
		</div>
	  );
}
