## Gorilla

Gorilla is designed for use on the Bitcoin Mini and built on Node.js but should work with any Linux/Bitcoin Core/Nodejs setup.  However no support is implied in making this code available.

Visit our website and order one today [BitcoinMini.com](https://bitcoinmini.com/).

## Installation

**Please note that the installation is based on the exact file structure on the Mini**
If you don't use this file structure config.json contents will be deleted with error [This needs to be fixed before use.  There is no reason to default to overwrite on error]

    // file structure
    <root dir / >
    |_ home
        |_ user home folder
            |_ .bitcoin
            |_ Gorilla-UI


Load the npm dependencies:

`npm install`


Run:

`node guerilla`

or

`pm2 start guerilla -i 0`

## Setup

Find the internal IP address by logging into your router and finding the device on the network. More detailed directions can easily be found on the internet.

There is a disabled by default system to have the Mini email you the ip address but this is not recommended. Most routers are fairly easy to access with the use of web search for the model.


### Security

You are responsible for understanding the ramifications of opening ports on your internet connection.  Please contact us with any questions.


### Externally Installed Packages

These applications need to be installed on the Mini for use.

    bitcoind & bitcoin-cli
    Nodejs
    NPM
    PM2 (For Autostart and Load Balancing)


### NPM Installed Packages

These packages need to be installed on the Mini.

    DEPENDENCIES
    express
    bitcoin
    bitcoinjs-lib
    body-parser
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
    

## The Bitcoin Mini

Gorilla is designed to run on the Bitcoin Mini. Every piece of software was chosen for it's small and powerful nature to reduce the overall footprint of the Mini while keeping it fast and effienct.

All Minis come with [Arch Linux](https://www.archlinux.org/) as it's operating system and Bitcoin Core installed with the approximately 52GB of blockchain data downloaded.


### Contributors

We have bug and development bounties available. If you find a bug, create a pull request on our dev repo @ github.com/bitcoinmini/gorilla-ui. Bounties will be UP TO 0.1 btc for now based on how big it is, and we will increase that as we can. A list of wanted development bounties will soon be available on our subreddit r/bitcoinmini. Decentralize all the things.

We will be publishing development bounties on our subreddit r/bitcoinmini in the near future. Contact us to be added to the early offer mailing list for development bounties.

Any other questions please reach out to us here on github, or on reddit. Thank you.


## License

Gorilla is free and open-source software released under the MIT license.


## Copyright

Gorilla (c) 2015 Mini Computing, LLC
Released under MIT license