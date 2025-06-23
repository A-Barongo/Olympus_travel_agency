#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource

from config import app, db, api
from models import User



if __name__ == '__main__':
    app.run(port=5001, debug=True)