const Eureka = require('eureka-js-client').Eureka;

// Set the Eureka server's host and port based on your Docker network configuration
const eurekaHost = 'eureka-server'; // Use the service name as defined in your Docker Compose file
const eurekaPort = 8761;

const hostName = process.env.HOSTNAME || 'eureka-server'; // Use the service name or container name as the host name
const ipAddr = '172.17.0.2'; // Set the appropriate IP address for the Docker container

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': 'true',
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        // Retry 10 times for 3 minutes and 20 seconds.
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: '/eureka/apps/',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    });

    client.logger.level('debug');

    client.start(error => {
        console.log(error || `${appName} service registered`);
    });

    function exitHandler(options, exitCode) {
        if (options.cleanup) {
            // Clean up resources, if necessary
        }
        if (exitCode || exitCode === 0) console.log(`Exit code: ${exitCode}`);
        if (options.exit) {
            client.stop(() => {
                console.log(`${appName} service deregistered`);
            });
        }
    }

    client.on('started', () => {
        console.log(`Eureka host: ${eurekaHost}`);
    });

    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};
