#!/bin/bash

# Setup custom domain for HeliconTrade Marketing Portal
# You can replace marketing.helicontrade.com with your desired domain

echo "Adding custom domain to HeliconTrade Marketing Portal..."

# Replace this with your actual domain
CUSTOM_DOMAIN="marketing.helicontrade.com"

wrangler pages domain add $CUSTOM_DOMAIN --project-name=helicontrade-marketing-portal

echo "Domain setup complete!"
echo "Make sure to update your DNS records to point to:"
echo "CNAME: helicontrade-marketing-portal.pages.dev"
echo ""
echo "Available domains:"
echo "- https://helicontrade-marketing-portal.pages.dev (default)"
echo "- https://$CUSTOM_DOMAIN (after DNS setup)"