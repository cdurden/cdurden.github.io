#!/bin/sh
tags="href src"
extensions="css png pdf js"
for tag in ${tags}; do
    for extension in ${extensions}; do
        sedcmda=`echo ${tag} | xargs -I {tag} echo 's/{tag}="\([^"]*\.{ext}\)\.html"/{tag}="\1"/g'`
        sedcmdb=`echo ${extension} | xargs -I {ext} echo ${sedcmda}`
        #echo ${sedcmda}
        #echo ${sedcmdb}
        #cat index.html | sed -n ${sedcmdb}
        #exit
        find . -path ./.git -prune -o -type f -name '*\.html' -print0 | xargs -0 sed -i ${sedcmdb}
    done
done

