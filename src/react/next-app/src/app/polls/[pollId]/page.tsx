export default function Detail( {params}: {
	params: {
		pollId: number;
		};
	}) {
	return <h1>detail for poll {params.pollId} </h1>
}