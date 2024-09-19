from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views import generic
from rest_framework.decorators import api_view
from .models import Question, Choice

import json

@api_view(['GET'])
def index(request):
	latest_questions = list(Question.objects.values('question_text', 'id').order_by("-pub_date")[:5])
	return JsonResponse({'success': True, 'context': latest_questions })

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
		question = Question.objects.get(pk=question_id)
	except Question.DoesNotExist:
		return JsonResponse({'code': 404, 'message': 'Invalid question'})
	return JsonResponse({'code': 200, 'message': context})

@api_view(['POST'])
def vote(request, question_id):
	question = Question.objects.get(pk=question_id)
	try:
		selected_choice = question.choice_set.get(pk=request.POST["choice"])
	except (KeyError, Choice.DoesNotExist):
		return JsonResponse({'code': 406, 'error' : "You didn't select a choice."})
	else:
		selected_choice.votes = F("votes") + 1
		selected_choice.save()
	return JsonResponse({'code': 200, 'message': f'Voted for {selected_choice}'})

