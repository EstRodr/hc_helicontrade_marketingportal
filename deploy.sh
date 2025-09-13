#!/bin/bash

# Quick deployment script for HeliconTrade Marketing Portal
# This script builds and deploys the site to Cloudflare Pages

cd marketing-site
wrangler pages deploy dist --project-name=helicontrade-marketing-portal