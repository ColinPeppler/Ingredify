import base64
import io
import requests

# Pass the image data to an encoding function.
def encode_image(image_file):
  image_content = image_file.read()
  return base64.b64encode(image_content)


url = 'http://127.0.0.1:5000' + '/readtext'
with io.open('img.jpg', 'rb') as image_file:
	#base64_encoding = encode_image(image_file)
	#img_utf8 = base64_encoding.decode("UTF-8")
	payload = {'img_file': image_file}
	r = requests.post(url, files = payload)
	print(r.text)
