from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .assistant import ask_ai
@api_view(['POST'])
def assistant_view(request):
    message = request.data.get("message")
    if not message:
        return Response({
            "error": "Message requis"
        }, status=400)
    ai_response = ask_ai(message)
    return Response({
        "response": ai_response
    })