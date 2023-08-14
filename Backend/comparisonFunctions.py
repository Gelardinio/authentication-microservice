from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def connectMongoDb():   
    uri = "mongodb+srv://gerald:!@auth.sscgcod.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        print("Connected to MongoDB")
        return client
    except Exception as e:
        print(e)

def compareBrowserData(browserData):
    try:
        client = connectMongoDb();
        db = client['auth']  

        collection = 'browserData' + " " + browserData['ip']

        if collection not in db.list_collection_names():
            db.create_collection(collection)

        duplicate = {
            "screenWidth": browserData['screenWidth'],
            "screenHeight": browserData['screenHeight'],
            "isMobile": browserData['isMobile'],
            "isTablet": browserData['isTablet'],
            "userAgent": browserData['userAgent'],
            "ip": browserData['ip']
        }

        doesExist = db[collection].find_one(duplicate)

        if not doesExist:
            db[collection].insert_one(browserData)

    except Exception as e:
        print(e)

def processMouseNodes(data):
    try: 
        client = connectMongoDb();
        db = client['auth']  

        mouseMovements = data['mouseMove']
        browserData = data['browserData']

        collection = 'mouseMovement' + " " + browserData['ip'] + " " + browserData['userAgent']

        db[collection].insert_many(mouseMovements)

    except Exception as e:
        print(e)

