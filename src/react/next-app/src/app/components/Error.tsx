import { ErrorMessage } from "../interfaces";

export const ErrorPage = ({ status, message }: ErrorMessage) => {
	return (
	<div>
		<h1> {message} </h1>
		<strong> status: {status} </strong>
	</div>
	);
};