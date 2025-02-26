import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    DEBUG = True
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'data')
    ALLOWED_EXTENSIONS = {'txt', 'data', 'specmode'}
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("SDT_MAIL")
    MAIL_PASSWORD = os.getenv("SDT_PASSWORD")
    MAIL_DEFAULT_SENDER = ('7DT Observation Alert', os.getenv("SDT_SENDER")) 

class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

