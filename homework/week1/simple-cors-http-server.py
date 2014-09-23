#! /usr/bin/env python2
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer
import urllib2

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    page = urllib2.urlopen('https://api.whitehouse.gov/v1/petitions.json?limit=25').read()
    with open('petitions.json', 'w') as f:
        f.write(page)
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)
