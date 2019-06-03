BASEURL='https://cdurden.github.io'
URL='http://localhost'

html:
	wget -F -t 0 -m -k -E --base=${BASEURL} -np ${URL} -nH -P . 

fix:
	sh FixLinks.sh
all: html
