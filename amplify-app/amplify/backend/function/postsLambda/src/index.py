def handler(event, context):
  print('received event:')
  print(event)
  print("added one sample line for testing")
  return {
    'message': 'Hello from your new Amplify Python lambda!'
  }
