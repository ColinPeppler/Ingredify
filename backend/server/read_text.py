import re
from flask import Flask, request
import base64

def detect_text(image_file):
	"""Detects text in the file."""
	from google.cloud import vision
	import io
	client = vision.ImageAnnotatorClient()

	#with io.open(path, 'rb') as image_file
	content = image_file.read()

	image = vision.types.Image(content=content)

	response = client.text_detection(image=image)   
	texts = response.text_annotations

	ingredients = texts[0].description.split('INGREDIENTS:')[1]
	ingredients = re.split('[.,\n]', ingredients)
	ingredients = list(map(lambda e: e.strip(), ingredients))
	ingredients = list(filter(lambda s: s != "", ingredients))
	print(ingredients)

	if response.error.message:
		raise Exception(   
			'{}\nFor more info on error messages, check: '
			'https://cloud.google.com/apis/design/errors'.format(
				response.error.message))
	
	return ','.join(ingredients)


app = Flask(__name__)

''' FLASK SHIT '''
@app.route('/readtext', methods=['POST'])
def predict():
	print(request)
	image_file = request.files['img_file']
	return detect_text(image_file)
	#return detect_text('./img.JPG')

app.run()

