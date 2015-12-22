## Guerilla

Guerilla is built on Node.js. It is optimized for use on the Bitcoin Mini. Visit our website and order one today [BitcoinMini.com](https://bitcoinmini.com/).

## Installation

We are working on creating an npm module, but for now you have to download the zip from the left of the screen, unzip in our project directory, and do the following on the commandline from the project directory.

Load the npm dependencies:

`npm install`

Run:

`node guerilla`

## Setup

Retail customer setup is plug-and-play. When the Bitcoin Mini is delivered, the customer plugs in the two included cables in this order 1) ethernet 2) power. The Mini will bootup. When the Node.js server is running, the Mini discovers it's own internal network NAT IP and sends an email to the email associated with the purchase of the Mini. This is all done internally on the Mini itself and never connects to a Mini Computing server. When the customer recieves the email, they can simply point any browser from a network connected device at the IP contained in the email.

If the user doesn't have access to the email used for purchase, there is a manaul way to find the internal IP address by logging into the router's UI and finding devices on the network. More detailed directions are included with purchase, or can easily be found on the internet.

When a user shuts down or unplugs their Mini and plugs it back in, many times the Mini will recieve a new IP address from the router. The automated process will complete itself again and send a new email. Disabling the feature is coming in later updates.

### Security

The Mini is designed to run a server behind the router's firewall. The UI is protected from the wilds of the internet by the router's NAT routing protocol. Currently we do not recommend opening up ports on your router, (like 8332 for bitcoin), due to the security risk. We are actively working on this aspect to ensure a high base level of security. That also means Bitcoin Minis don't seed the network at this time. It does connect to peers, but doesn't offer the blockchain to download for new peers. The Mini functions as a fully operational Bitcoin full node.

There is a chance that your ISP will contact you if you send emails from your Mini. Usually ISPs (your internet provider) thinks it's a virus that is sending spam emails. You can either explain it to them or tell them it was taken care of. You'll only be sending one email on boot, so it might not even raise their attention.

### Globally Installed Packages

These packages are installed globally on the Mini for ease of use in development. 

	Node.js
	npm
	Express.js
	Bower
	PM2


### Locally Installed Packages

These packages are locally installed on the Mini, which means they are part of the app itself and can be seen in the node_modules folder.

	DEPENDENCIES
	bitcoin
    bitcoinjs-lib
    body-parser
    bower
    colors
    express
    fs-extra
    get-json
    internal-ip
    nodemailer
    nodemailer-direct-transport

	DEV DEPENDENCIES
	grunt
    grunt-cli
    grunt-contrib-less
    grunt-contrib-watch
    morgan
    sha1-file
    winston
	
## Other Software on the Mini

Guerilla is designed to run on the Bitcoin Mini. Every piece of software was chosen for it's small and powerful nature to reduce the overall footprint of the Mini while keeping it fast and effienct.

All Minis come with [Arch Linux](https://www.archlinux.org/) as it's operating system and [Bitcoin Core](https://github.com/bitcoin/bitcoin) installed.

### Contributors

We will be publishing development bounties on our subreddit r/bitcoinmini in the near future. We will be emailing all available bounties to our current customers one week prior to posting them on reddit. Bounties can be reserved for 2 weeks by current customers.

Any other questions please reach out to us here on github, or on reddit. Thank you.

## License

Guerilla is free and open-source software released under the MIT license.

## Copyright

Guerilla (c) 2015 Mini Computing, LLC
Released under MIT license