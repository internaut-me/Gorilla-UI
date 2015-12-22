#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/*================================= MODULE DEPENDENCIES ==*/
var fs = require('fs-extra');
var getJson = require('get-json');
var config = require('../../config');

/**
 * Check with BitcoinMini.com to see if there is a new version available.
 * CHange the values in the config.json to enable the user to check if a new version is available.
 */

module.exports = function checkUpdate() {
    // Check if an update is available
    getJson('https://bitcoinmini.com/nodeData/alerts.php', function(err, response) {
        if (err) console.log(err);
        var versionAvailable = response.upgrade;

        // if the current version and available aren't equal, update the available value in config.json
        if(config.system.version.current !== versionAvailable) {

            // Backup file in tmp folder
            fs.writeJson('./bin/tmp/backup_config.json', config , function (err) {
                if (err) console.log(err);
            });

            config.system.version.available = versionAvailable;

            // Serialize entire var content as JSON and write it to a file
            // this overwrites whole content
            fs.writeJson('./config.json', config , function (err) {
                if (err) console.log(err);
            });
        }
    });
}
