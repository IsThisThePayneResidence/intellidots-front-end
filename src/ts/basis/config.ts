const s = 1000
const m = 60 * s

const config = {
  api: {
    url: 'http://localhost:8080/',
    // url: 'http://172.16.37.44:9191/api/',
    // url: 'http://172.16.28.53:49191/api/',
    // url: 'http://rms-01.prod-nl.lms:9191/api/',
  },
  duration: {
    // s
    notification: 5,
    // ms
    idle: 30 * m,
    autoloader: 5 * s,
    infrequentAutoloader: 5 * m,
    token: 1 * m,
  },
  view: {
    pageSizes: [15, 30, 50, 100],
  }

}



export default config
