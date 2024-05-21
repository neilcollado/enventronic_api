const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Content = new Schema({
  header: {
    type: String
  },
  subheader: {
    type: String
  },
  content: {
    type: String
  }
}, { _id: false });

const Highlight = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
}, { _id: false });

const EventSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  subheader: {
    type: String
  },
  banner_img: {
    type: String
  },
  event_date: {
    type: Date,
    require: true
  },
  date_description: {
    type: String
  },
  ticket_price: {
    type: Number
  },
  event_time: {
    type: String,
    require: true
  },
  event_duration: {
    type: String
  },
  event_rules: {
    type: String
  },
  event_location: {
    type: String,
    require: true
  },
  event_address: {
    type: String
  },
  event_access: {
    type: String
  },
  event_content: [Content],
  event_highlight: [Highlight],
  event_description: {
    type: String,
    require: true
  }
});

const EventModel = mongoose.model("event", EventSchema);
module.exports = EventModel;