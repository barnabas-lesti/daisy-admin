# Production Setup

## New Linode setup

- Distribution: Debian
- Region: Europe, UK
- Linode Plan: Nanode
- Linode Label example: daisy.prod.main1.debian.eu-west
- Setup Root password
- Create

## Installation and settings
   - Login to console
   - Commands:
		```bash
		# Update
		sudo apt-get update

		# Git
		sudo apt-get install git

		# NodeJs
		curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
		sudo apt-get install -y nodejs

		# Clone repository
		git clone https://github.com/barnabas-lesti/daisy-web-app.git

		# Install dependencies
		cd daisy-web-app
		npm install
		```
   - Create a _production.env_ file in the _env_ folder.
   - Build the client
   - Start the server
