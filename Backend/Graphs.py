import json

class Node:
    def __init__(self, val = None, next = None):
        self.val = val
        self.next = next

class Graph:
    def __init__(self, head = None):
        self.head = head

def parseFunc(inputData):
    print(inputData['browser'])
    return 1
