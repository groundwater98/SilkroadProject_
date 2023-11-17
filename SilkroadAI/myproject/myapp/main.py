from myproject.chatgpt import summary, gpt_check
from myproject.bard import bard_roadmap, bard_predict
import myproject.config as cfg
import time
import requests
import openai


def check_job(occupation):
    
    check_job = "No."
    while check_job not in ('Yes.','yes.', "예.", 'Yes', 'yes', '예'):
        # Job 
        user_input = occupation
        # Check the existence of job
        check_job = gpt_check(user_input)
        print(check_job)
        if check_job in ('Yes.','yes.', "예.", 'Yes', 'yes', '예'):
            break
    return user_input

def generate_roadmap(occupation, period, period_type):
    
    user_input = check_job(occupation)  
    
    # Date
    date_input = f'{period} {period_type}'
    
    # Generate BARD roadmap
    bard_response = bard_roadmap(user_input, date_input)
    time.sleep(2)
    
    # Exception handling for Time out error
    try:
        # Generate Final Response
        final_response = recall(summary, bard_response)
        time.sleep(2)
    except openai.error.OpenAIError as e:
        print(f"An OpenAI API error occurred: {e}")

    # formatting 
    final_response.replace("#", "*")
    
    # Generate roadmap response 
    final_roadmap = user_input + "\n" + final_response

    return final_roadmap

def generate_outlook(occupation):
    
    user_input = check_job(occupation)  

    # Generate BARD outlook
    bard_response = bard_predict(user_input)
    time.sleep(2)
    
    # Exception handling for Time out error
    try:
        # Generate Final Response
        final_response = recall(summary, bard_response)
        time.sleep(2)
    except openai.error.OpenAIError as e:
        print(f"An OpenAI API error occurred: {e}")

    # formatting
    final_response.replace("#", "*")

    # Generate outlook response    
    final_predict = user_input + "\n" + final_response

    return final_predict

# Logic for retrying the OpenAi API call
def recall(api_call, *args, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return api_call(*args, **kwargs)
        except openai.error.Timeout as e:
            if attempt < max_retries - 1:
                wait = 2 ** attempt  # Exponential back-off
                # Time for waiting
                print(f"Timeout, retrying in {wait} seconds...")
                time.sleep(wait)
            else:
                print("Final attempt failed, no more retries.")
                raise e
            