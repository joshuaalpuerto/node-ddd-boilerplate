const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || 1
const maxMemory = process.env.WEB_MEMORY || 512

pm2.connect(() => {
  pm2.start({
    script: 'index.js',
    name: 'node-ddd-api',
    instances: instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      NODE_PATH: '.'
    }
  }, (err) => {
    if (err) {
      console.error('Error while launching applications', err.stack || err)
      return pm2.disconnect()
    }

    console.log('PM2 and application has been succesfully started')

    pm2.launchBus((_, bus) => {
      console.log('[PM2] Log streaming started')

      bus.on('log:out', (packet) => {
        console.log('[App:%s] %s', packet.process.name, packet.data)
      })

      bus.on('log:err', (packet) => {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data)
      })
    })
  })
})
