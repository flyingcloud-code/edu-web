#!/usr/bin/env python3
"""
AI 小猫学习站 - 局域网 Web Server
端口: 7123
"""
import http.server
import socketserver
import socket
import os
import json
from urllib.parse import urlsplit

PORT = 7123
ROOT = "/Volumes/External-HD-data/Projects/edu-web"
MUSICLAB_ROOT = os.path.join(ROOT, "chrome-music-lab", "musiclab.chromeexperiments.com")

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def guess_type(self, path):
        if path.startswith(MUSICLAB_ROOT + os.sep) and not os.path.splitext(path)[1]:
            return "text/html; charset=utf-8"
        return super().guess_type(path)
    
    def do_GET(self):
        request_path = urlsplit(self.path).path

        # API: return local IP for LAN access
        if request_path == '/api/ip':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            ip = get_local_ip()
            self.wfile.write(json.dumps({'ip': ip}).encode())
            return

        if request_path == '/chrome-music-lab/indx.html':
            redirect_to = '/chrome-music-lab/'
            self.send_response(302)
            self.send_header("Location", redirect_to)
            self.end_headers()
            return
        
        # Default: serve files
        return super().do_GET()
    
    def end_headers(self):
        # CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def get_local_ip():
    """Get the local network IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

if __name__ == '__main__':
    ip = get_local_ip()
    os.chdir(ROOT)
    
    print(f"""
🐱 AI 小猫学习站 已启动！
═══════════════════════════════════════
  📁 根目录: {ROOT}
  🌐 本机访问: http://127.0.0.1:{PORT}
  🌐 局域网访问: http://{ip}:{PORT}
  📱 同网络设备可用: http://{ip}:{PORT}
═══════════════════════════════════════
  按 Ctrl+C 停止服务器
""")
    
    with ReusableTCPServer(("0.0.0.0", PORT), MyHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 服务器已停止。再见！👋")
