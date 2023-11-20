import openai
import os
import myproject.config as cfg

# ChatGPT API KEY
openai.api_key = cfg.gpt_config["api_key"]

# Build the final RoadMap
def summary(bard):
   
    role1 = "Please translate what you received into Korean. And please never remove or change special characters such as '*' from the input received. And never change the input, just translate it into the format you entered and print it out."
    role2 = "If it's in Korean, don't change or add any letters, just print it out as it is"
    response = openai.ChatCompletion.create(
        model = "gpt-4",
        #model = "gpt-4",
        messages = [
            {"role": "system", "content": role1},
            {"role": "system", "content": role2},
            {"role": "user", "content": bard},
        ]
    )
    return response.choices[0]['message']['content']

def gpt_check(job):

    role = """You are the role of answering just only 'Yes' or 'No' unconditionally to see if the job I enter exists. Also, Please don't say anything extra than 'Yes' or 'No'. please, please, please don't say anything except "Yes" or "No"."""
    
    response = openai.ChatCompletion.create(
        model = "gpt-4",
        messages=[
            {"role":"system", "content": role},
            {"role": "user", "content": job}
        ],
        max_tokens = 1 # Ensuring the model generates a very short completion, 'Yes' or 'No' should each only be 1 token.
    )
    return response.choices[0]['message']['content']
