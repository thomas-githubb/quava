#!/bin/bash

git commit -a -m "Deployment + Changes"
git push
git fetch
vercel 
vercel --prod