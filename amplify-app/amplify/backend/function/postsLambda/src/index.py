import json

def handler(event, context):
  print('received event:')
  print(event)
  print("added one sample line for testing")
  responseBody = {
    "message": "hey from Lambda !!!"
  }
  return {
    "statusCode": 200,
    "body": json.dumps(responseBody)
  }
