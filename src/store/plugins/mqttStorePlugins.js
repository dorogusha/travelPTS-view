// call mqtt
import mqtt from 'mqtt'

export default (options => {
  return store => {
    // mqtt topic options
    let topics = {
      unit: `wh2/fleet/1/#` /* ${this.$store.getters.fleetId} */
    }
    // plugin mqtt options
    // look details at http://flespi.io
    let mqttFlespi = mqtt.connect({
      port: 80,
      host: 'mqtt.flespi.io',
      // username: 'FlespiToken W6rP5Ner9Q1gBjehRF0EWohQSc0jK85u3k7YVbdSS4Yhb2oQyckkpqZ7sPe0M7kF',
      username: 'FlespiToken h3YJIroAb6guuKQkbMwnRNeIx25kBtWGkIfS0rgZomjGUZOVza9gLdM93IjuZ31a',
      keepalive: 60,
      reconnectPeriod: 1000
    })
    // plugins mqtt events
    // subscribe on messages
    mqttFlespi.on('connect', () => {
      console.log('mqtt connect', arguments)

      mqttFlespi.subscribe(topics.unit, () => {
        console.log('mqtt subscribe', arguments)
      })
    })
    // receive message callback
    mqttFlespi.on('message', (topic, message, packet) => {
      // find unit
      let backendId = parseInt(topic.split('/').pop()) // 1224956
      let unit = store.getters.getItemByBackendId('units', backendId /* === 17184925 ? store.state.units[99].backend_unit_id : backendId */)
      // parse message
      let msg = JSON.parse(message)
      // need only message with position, else exit
      if (!unit || !msg.pos || !msg.pos.x || !backendId) {
        return
      }
      // parse message & find position data
      let data = {
        // unit course in degree
        course: msg.pos.c,
        // gps count
        gps: msg.pos.sc,
        // unit speed
        speed: msg.pos.s,
        // last message time
        lastMessageTime: msg.time,
        // last position
        position: {lat: msg.pos.y, lng: msg.pos.x}
      }
      // update data
      store.dispatch('updateItem', {type: 'units', id: unit.id, params: data})
      // }
      // add message data to storage
      store.dispatch('lastMessage', {type: 'units', id: unit.id, message: msg})
      // console.log(`Новое сообщение для юнита (${unit.id})': `, msg)
    })
  }
})()
