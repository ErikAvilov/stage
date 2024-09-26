import { MouseEventHandler } from 'react';

interface ButtonProps {
	action: MouseEventHandler<HTMLButtonElement>;
	text: string;
}

export const MyButton:React.FC<ButtonProps> = ({action, text}) => {
	return (
	<>
		<button
		className="hover:underline hover:underline-offset-4"
		onClick={action}>
		{ text }
		</button>
	</>
  );
}
