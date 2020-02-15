import re
from flask import Flask, request
import base64

def detect_text():
	"""Detects text in the file."""
	from google.cloud import vision
	import io
	client = vision.ImageAnnotatorClient()

	with io.open('img.jpg', 'rb') as image_file:
		content = image_file.read()

	image = vision.types.Image(content=content)

	response = client.text_detection(image=image)   
	texts = response.text_annotations

	ingredients = texts[0].description.split('INGREDIENTS:')[1]
	ingredients = re.split('[.,\n]', ingredients)
	ingredients = list(map(lambda e: e.strip(), ingredients))
	ingredients = list(filter(lambda s: s != "", ingredients))

	if response.error.message:
		raise Exception(   
			'{}\nFor more info on error messages, check: '
			'https://cloud.google.com/apis/design/errors'.format(
				response.error.message))
	
	return ingredients


def detect_bad_effects(ingredients):
	effects = {'VANILLIN': 'cancer'}
	found_effects = {}
	for ingredient in ingredients:
		if ingredient.upper() in effects.keys():
			found_effects.update({ingredient : effects[ingredient.upper()]})
	return found_effects
			


app = Flask(__name__)

''' FLASK SHIT '''
@app.route('/readtext', methods=['POST'])
def predict():
	data = request.get_json(force=True)
	img_b64 = data['img_b64'].split('data:image/png;base64,')[1]
	print(img_b64)

	img_data = base64.b64decode(img_b64)
	with open('img.jpg', 'wb') as f:
		f.write(img_data)
	ingredients = detect_text()
	r = detect_bad_effects(ingredients)
	print(r)
	return r
app.run()

