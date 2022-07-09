"""import os
from http.server import HTTPServer, CGIHTTPRequestHandler
# Make sure the server is created at current directory
os.chdir('.')
# Create server object listening the port 80
server_object = HTTPServer(server_address=('localhost', 8088), RequestHandlerClass=CGIHTTPRequestHandler)
# Start the web server
#print(server_object.serve_forever())
print(server_object.grt)"""




"""import http.server
 
PORT = 8088
server_address = ("", PORT)

server = http.server.HTTPServer
handler = http.server.CGIHTTPRequestHandler
#handler.cgi_directories = ["/"]
print("Serveur actif sur le port :", PORT)

httpd = server(server_address, handler)
httpd.serve_forever()
print(httpd.get_request)"""

from http.server import HTTPServer, BaseHTTPRequestHandler


class RequestHandler(BaseHTTPRequestHandler):
  def do_GET(self):
    print('data', self.rfile.read())
    self.send_response(200)
    self.send_header('Content-Type', 'text/html')
    self.end_headers()
    message = 'Hello Client!'
    self.wfile.write(bytes(message, 'utf8'))
    return

def server_start():
  address = ('localhost', 8088)
  httpd = HTTPServer(address, RequestHandler)
  httpd.serve_forever()


server_start()