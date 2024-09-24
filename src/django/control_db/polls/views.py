from django.http import HttpResponse, JsonResponse
from django.db.models import F
from .models import Question, Choice

from .serializers import ChoiceSerializer, QuestionSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

class PollsList(generics.ListCreateAPIView):
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer

class ChoiceList(generics.ListAPIView):
	serializer_class = QuestionSerializer

	def get_queryset(self):
		return Choice.objects.filter(question=self.kwargs['question_id'])

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

