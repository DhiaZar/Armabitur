import re, os

files = ['index.html','conditions.html','donations.html','privacypolicy.html','signup.html','login.html','contact.html','workspace.html']
fileExtensions = []
for x in files:
    eachFile = open(x,'r')
    innerFileString = eachFile.read()
    hrefRefs = re.findall('href="(.+\.html|.+\.png|.+\.js|.+\.ico|.+\.css|.+\.jpg)"',innerFileString)
    srcRefs = re.findall('src="(.+\.png|.+\.js|.+\.jpg)"',innerFileString)
    fileExtensions.append(hrefRefs)
    fileExtensions.append(srcRefs)
flatten = lambda theList: [item for sublist in theList for item in sublist]
refrences = list(set(flatten(fileExtensions)))
for i in refrences:
    if '.css' in i:
        styleFile = open(i[1:],'r').read()
        f2 = re.findall('url\(.+\)',styleFile)
        for m in f2:
            refrences.append(m[4:-1])

refrences.remove('/conditions.html">Terms</a> and <a href="/privacypolicy.html')
print(refrences)
directory = os.path.abspath(os.getcwd())
configFile = open('prod.conf','w')
configFile.write("[global]\nserver.socket_host: r'0.0.0.0'\n[/]\ntools.staticdir.root=r'{}',\ntools.sessions.on=True,\nrequest.dispatch= cherrypy.dispatch.MethodDispatcher()\n".format(directory))
for item in refrences:
    configFile.write("[{}]\ntools.staticfile.on = True,\ntools.staticfile.filename = r'{}{}'\n".format(item,directory,item))