import json
        
def handler(event, context):
    json_name = "Ca"
    json_company = "Rikkeisoft"
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "message": "Hello World From test!",
            "name" : json_name,
            "company" : json_company,
        })
    }