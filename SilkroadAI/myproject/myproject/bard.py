import os
import bardapi
import myproject.config as cfg

# BARD API KEY
os.environ['_BARD_API_KEY'] = cfg.bard_config["api_key"]

roadmap_form = cfg.bard_config['road_answer_form']
predict_form = cfg.bard_config['predict_answer_form']


# Roadmap function
def bard_roadmap(job, date):
 
    question = f"""Please create a detailed roadmap for the time period {date} for {job} in keyword text format specifically from the perspective of an expert on a monthly basis.Also, if you have any certificates or materials needed for the course, please recommend them separately.
                I give you a basic form. Please make it in this form. Don't make it the same, Even though the time period requested and the time period in the form might be different, please please please please consider the form but make sure to match the time period requested.
                form : [{roadmap_form}]
                """
    
    response = bardapi.core.Bard().get_answer(question)

    return response['content']

# Outlook function
def bard_predict(job):
    question = f"""Please analyze the future prospects for the job as {job} in more specifically from the perspective of an expert. And don't just predict that the future prospects is good, but analyze that it's not good if it's not good.
                I give you a basic form. Please make it in this form. Don't make it the same, just consider the form.
                form : [{predict_form}]
                """
    response = bardapi.core.Bard().get_answer(question)

    return response['content']
