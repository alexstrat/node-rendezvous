Utility tool to parse rendezvous expressions like `today+3d@12:50` into Date objects.

```bash
$ npm install rendezvous
```

### Examples

```js
rdv = require('rendezvous')

new Date()
// Sat, 05 May 2012 09:21:12 GMT

rdv('now')
// Sat, 05 May 2012 09:21:12 GMT

rdv('now-3h')
// Sat, 05 May 2012 06:21:12 GMT

rdv('now+1d3h10m18')
// Sun, 07 May 2012 12:31:30 GMT

rdv('today@12:00')
// Sat, 05 May 2012 10:00:00 GMT (i am GMT+2)

rdv('today-4d@12:00')
// Tue, 01 May 2012 10:00:00 GMT (i am GMT+2)

rdv('today-4d@12:00+2h')
// Tue, 01 May 2012 12:00:00 GMT (i am GMT+2)

rdv.time('12:00:12:300')
// 43212300 (number of milliseconds between 00:00:00:0000 and 12:00:12:300)

rdv.duration('1d30m15s')
// 88215000 (number of milliseconds in 1 day 30 minutes and 15 seconds)

rdv('WTF')
// false (wrong expressions)

rdv('today')
// false (be careful..)
```

