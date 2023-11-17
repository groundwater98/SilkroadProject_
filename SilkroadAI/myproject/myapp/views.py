from django.http import JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
import json
from myapp.main import generate_outlook, generate_roadmap 

#@csrf_exempt
@require_http_methods(["POST"])  # POST 요청만 허용
def response_roadmap(request):
    try:
        # JSON 데이터를 파싱합니다.
        data = json.loads(request.body)
        occupation = data.get('occupation')
        period = data.get('period')
        period_type = data.get('periodType')
        
        # Roadmap을 생성합니다.
        final_roadmap = generate_roadmap(occupation, period, period_type)
        print(final_roadmap)

        # 생성된 final_roadmap을 JSON 응답으로 반환합니다.
        return HttpResponse(json.dumps(final_roadmap, ensure_ascii=False), content_type="application/json")
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except KeyError as e:
        return JsonResponse({'error': f'Missing data: {e}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

#@csrf_exempt
@require_http_methods(["POST"])  # POST 요청만 허용
def response_outlook(request):
    try:
        # JSON 데이터를 파싱합니다.
        data = json.loads(request.body)
        occupation = data.get('occupation')

        # Outlook을 생성합니다.
        final_outlook = generate_outlook(occupation)
        print(final_outlook)

        # 생성된 final_outlook을 JSON 응답으로 반환합니다.
        return HttpResponse(json.dumps(final_outlook, ensure_ascii=False), content_type="application/json")
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except KeyError as e:
        return JsonResponse({'error': f'Missing data: {e}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)