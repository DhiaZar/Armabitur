import os, os.path, hashlib, cherrypy, pymongo

configuration = os.path.exists('prod.conf')
if configuration == False:
    os.system('python config.py')


@cherrypy.expose
class index(object):
    def GET(self):
        return open('index.html')
@cherrypy.expose
class signup(object):
    def GET(self):
        return open('signup.html')
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        data = cherrypy.request.json
        if cherrypy.request.headers['X-Custom-Header'] == 'signup-Process':
            f = open('PostData.txt','a')
            f.write(str(data))
            f.close()
            return data
@cherrypy.expose
class workspace(object):
    @cherrypy.tools.accept(media='application/json')
    def GET(self):
        return open('workspace.html')
@cherrypy.expose
class login(object):
    def GET(self):
        return open('login.html')
    
        # cherrypy.log(cherrypy.request.remote.ip)
        # return cherrypy.request.body 
@cherrypy.expose
class privacy(object):
    def GET(self):
        return open('privacypolicy.html')
@cherrypy.expose
class donate(object):
    def GET(self):
        return open('donations.html')

@cherrypy.expose
class MainPage(object):
    index = index()
    workspace = workspace()
    signup = signup()
    donate = donate()
    login = login()
    privacypolicy = privacy()
        
restart = 'hahaha' #this is to restart the server due to changes in the code it restrats itself
if __name__ == '__main__':
    webapp = MainPage()
    cherrypy.quickstart(webapp,'','prod.conf')
    