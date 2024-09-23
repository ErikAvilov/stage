from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views import generic
from .models import Question, Choice
from django.db.models import F

from .serializers import ChoiceSerializer, QuestionSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

@api_view(['GET'])
def index(request):
	questions = Question.objects.all().order_by("-pub_date")[:5]
	serializer = QuestionSerializer(questions, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def	detail(request, question_id):
	try:
		question = Question.objects.get(pk=question_id)
	except Question.DoesNotExist:
		return JsonResponse({'code': 404, 'message': 'Invalid question'})
	return JsonResponse({'code': 200, 'message': question.question_text })

@api_view(['GET'])
def results(request, question_id):
	try:
		question = Question.objects.get(id=question_id)
		choices = Choice.objects.filter(question=question)
		question_data = QuestionSerializer(question).data
		choices_data = ChoiceSerializer(choices, many=True).data
		question_data['choices'] = choices_data
		return JsonResponse({'code': 200, 'context': question_data})
	except Question.DoesNotExist:
		return JsonResponse({'code': 404, 'message': 'Invalid question'})

@api_view(['POST'])
def vote(request, question_id):
	question = Question.objects.get(pk=question_id)
	try:
		selected_choice = question.choice_set.get(pk=request.data["choice"])
	except (KeyError, Choice.DoesNotExist):
		return JsonResponse({'status': 406, 'message' : "You didn't select a choice."})
	else:
		selected_choice.votes = F("votes") + 1
		selected_choice.save()
	return JsonResponse({'status': 200, 'message': f'Voted for {selected_choice}'})

