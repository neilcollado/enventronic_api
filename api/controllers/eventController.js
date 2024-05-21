const Event = require("../models/event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({});

    return res.status(200).json({events: events});
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve events from the database." });
  }
}

exports.newEvent = async (req, res) => {
  try {
    const { event } = req.body;

    if (!event) {
      return res.status(404).json({ error: "No event information provided." });
    }

    const newEvent = await Event.create({
      ...event,
    });

    return res.status(200).json({ event: newEvent });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create a new event." });
  }
}

exports.findEventById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ error: "No event ID provided." });
    }
    
    const eventDB = await Event.findById(id);

    return res.status(200).json({ event: eventDB });
  } catch (error) {
    return res.status(500).json({ error: "Failed to find event in the database." });
  }
}