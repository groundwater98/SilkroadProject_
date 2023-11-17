import openai
import os
import myproject.config as cfg

# ChatGPT API KEY
openai.api_key = cfg.gpt_config["api_key"]

# Build the final RoadMap
def summary(bard):
   
    role1 = "Please translate what you received into Korean and Answer it. And please don't remove or change any special characters like '*' in the input you receive"
    role2 = "If it's in Korean, don't change or add any letters, just print it out as it is"
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
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
        model = "gpt-3.5-turbo",
        messages=[
            {"role":"system", "content": role},
            {"role": "user", "content": job}
        ],
        max_tokens = 1 # Ensuring the model generates a very short completion, 'Yes' or 'No' should each only be 1 token.
    )
    return response.choices[0]['message']['content']


'''
# Build Roadmap function
def gpt_roadmap(job, date):
    if date == 0:
        role1 = "You are a role of drawing a specific roadmap for the profession you received."
        role2 = "Please answer in a keyword format with high readability"
        response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": role1 },
            {"role": "system", "content": role2 },
            {"role": "user", "content": job}
            
        ]
    )
    else:    
        role1 = "You are tasked with creating a roadmap for achieving a specific job within a set timeframe."
        role2 = "Please answer in a keyword format with high readability"
        response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": role1 },
            {"role": "system", "content": role2 },
            {"role": "user", "content": job},
            {"role": "user", "content": date}
            
        ]
    )
  
    return response.choices[0]['message']['content']

# Predict Future Outlook function
def gpt_predict(job):
    role = "You play a role in predicting the future prospects of the job in great detail."
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=[
            {"role":"system", "content": role},
            {"role": "user", "content": job}
        ]
    )
    return response.choices[0]['message']['content']


# Build the final RoadMap
def roadmap_summary(gpt, bard, date):
   
    role1 = "Please gather the two answers and analyze the future prospects more specifically and organize them. And please translate it into Korean"
    role2 = "Please answer only the one translated into Korean"
    
    response = openai.ChatCompletion.create(
        #model = "gpt-3.5-turbo",
        model = "gpt-4",
        messages = [
            {"role": "system", "content": role1},
            {"role": "system", "content": role2},

            {"role": "user", "content": gpt},
            {"role": "user", "content": bard},
        ]
    )
    return response.choices[0]['message']['content']
    
# Summarize the future OutLook
def predict_summary(gpt, bard):

    role1 = "Please gather the two answers and analyze the future prospects more specifically and organize them. And please translate it into Korean"
    role2 = "Please answer only the one translated into Korean"

    response = openai.ChatCompletion.create(
        #model = "gpt-3.5-turbo",
        model = "gpt-4",
        messages = [
            {"role": "system", "content": role1},
            {"role": "system", "content": role2},

            {"role": "user", "content": gpt},
            {"role": "user", "content": bard},
        ]
    )
    return response.choices[0]['message']['content']
'''
