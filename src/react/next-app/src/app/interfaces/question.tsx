export interface QuestionData {
	id: number;
	question_text: string;
	pub_date: string;
}

export interface ChoiceData {
	id: number;
	choice_text: string;
	votes: number;
}

export interface Choices {
	question_text: QuestionData['question_text'];
	choices: ChoiceData[];
}