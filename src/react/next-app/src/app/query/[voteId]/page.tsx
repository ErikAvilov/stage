"use client";

import { ChoiceData } from "@/app/interfaces";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export default function Page({ params }: { params: { voteId: number; }; }) {
	const [ vote, setVote ] = useState<number | null>(null);

	const handleVote = (e:any) => {
		setVote(e.target.value);
	}

	const handleSubmit = (e:any) => {
		e.preventDefault();
		mutate(vote);
	}

	const { mutate } = useMutation({
		mutationFn: async (vote: number | null) => {
			console.log('HERE')
			const { data } = await axios.put(`http://localhost:8000/polls/${params.voteId}/vote/`, {
				choice: vote,
			});
			return data;
		},
		onSuccess: (date) => { console.log(data.message) },
		onError: (error) => { console.error(data.message) },
	});

	const { data, error, isLoading } = useQuery<any>({ 
		queryKey: ['polls'],
		queryFn: async () => {
			const { data } = await axios.get<ChoiceData[]>(`http://localhost:8000/polls/${params.voteId}/`);
			console.log(data)
			return data;
		}
	});
	if (error) return <h1>{error.message}</h1>;
	if (isLoading) return <div><h1>Loading...</h1></div>;

	return (
	<div>
		<ul>
			<h1> { data.question_text } </h1>
			{data.choices.map((choice: ChoiceData, index: number) => 
				<li key={index}>
					<label htmlFor={ 'choice' + index }>{ choice.choice_text }</label>
					<input onChange={handleVote} type='radio' name='choice' id={ 'choice' + choice.id } value={choice.id}/>
				</li>
			)}
		</ul>
		<button onClick={handleSubmit}>Submit</button>
	</div>
	);
}