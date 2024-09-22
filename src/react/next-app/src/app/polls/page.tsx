"use client";

import { useState, useEffect, Component } from 'react';
import axios, { AxiosResponse } from 'axios';

export default function Polls() {
	const [ htmlContent, setHtmlContent ] = useState([]);
	const [ error, setError ] = useState(null);

	interface MyResponseData {
		id: number;
		question: string;
	}

	useEffect(() => {
		axios.get('http://localhost:8000/polls/')
		.then((response: AxiosResponse<MyResponseData>) => {
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

	  return (
		<div>
			<h1>Polls</h1>
			{ htmlContent.map((poll) => (
				<li key={poll.id}>
					{ poll.question }
				</li>
			))}
		</div>
	  );
}