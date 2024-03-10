from http.server import BaseHTTPRequestHandler, HTTPServer
import cgi

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        # Parse POST data
        post_params = cgi.parse_qs(post_data.decode('utf-8'))

        # Respond to the client
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        # Echo back the received data
        response_message = "Received POST request with data: {}".format(post_params)
        self.wfile.write(response_message.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()