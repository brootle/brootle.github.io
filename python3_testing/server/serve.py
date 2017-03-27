# type in browser http://127.0.0.1:8080/

from http.server import BaseHTTPRequestHandler, HTTPServer

# declare a class that descents from BaseHTTPRequestHandler
class HTTPServer_RequestHandler(BaseHTTPRequestHandler):
    
    # GET
    def do_GET(self):

        # send response status code
        self.send_response(200)

        # send headers
        self.send_header("Content-type", "text/html")
        self.end_headers()

        # write message
        self.wfile.write(bytes("hello, world", "utf8"))
        return

# configure server
port = 8080
server_address = ("0.0.0.0", port) # it actually says to listen to everything
httpd = HTTPServer(server_address, HTTPServer_RequestHandler)

# run server 
httpd.serve_forever()

# type in browser http://127.0.0.1:8080/


################### SERVER EXAMPLE ##################################################
# https://daanlenaerts.com/blog/2015/06/03/create-a-simple-http-server-with-python-3/
#####################################################################################

# from http.server import BaseHTTPRequestHandler, HTTPServer
 
# # HTTPRequestHandler class
# class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
 
#   # GET
#   def do_GET(self):
#         # Send response status code
#         self.send_response(200)
 
#         # Send headers
#         self.send_header('Content-type','text/html')
#         self.end_headers()
 
#         # Send message back to client
#         message = "Hello world!"
#         # Write content as utf-8 data
#         self.wfile.write(bytes(message, "utf8"))
#         return
 
# def run():
#   print('starting server...')
 
#   # Server settings
#   # Choose port 8080, for port 80, which is normally used for a http server, you need root access
#   server_address = ('127.0.0.1', 8081)
#   httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
#   print('running server...')
#   httpd.serve_forever()
 
 
# run()
