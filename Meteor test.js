Events = new Mongo.Collection('events')

if (Meteor.isClient) {
	Template.body.events({
		'mousemove .canvas'(event) {
			Events.insert({
				name: 'moved',
				position: [event.clientX - 12, event.clientY - 12, 10],
				date: new Date()
			})
		}
	})

	Template.body.helpers({
		lastEvent() { return Events.findOne() }
	})

	Meteor.subscribe('events')
}

if (Meteor.isServer) {
	Meteor.publish('events', function() {
		return Events.find({}, {sort: {date: -1}, limit: 1})
	})
}