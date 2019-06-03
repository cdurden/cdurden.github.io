BASEURL='https://cdurden.github.io'
URL='http://localhost'

html:
	wget -t 0 -m -k -E -F --base=${BASEURL} -np ${URL} -nH -P . 
all: html
