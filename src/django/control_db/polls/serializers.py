from rest_framework import serializers
from .models import Question, Choice

class ChoiceSerializer(serializers.ModelSerializer):
	question_text = serializers.CharField(source='question.question_text', read_only=True)
	
	class Meta:
		model = Choice
		fields = ['id', 'choice_text', 'votes', 'question_text']

class QuestionSerializer(serializers.ModelSerializer):
	choices = ChoiceSerializer(many=True)

	class Meta:
		model = Question
		fields = ['id', 'question_text', 'choices']