import sys
from PIL import Image
import requests
from io import BytesIO
from nsfw_detector import predict

def getImage(url: str) -> Image:
    responce = requests.get(url= url)
    img = Image.open(BytesIO(responce.content))
    return img

def is_nsfw(img_path: str) -> bool:
    model = predict.load_model('./model/saved_model.h5')
    print(predict.classify(model, img_path))





