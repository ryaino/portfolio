import {defineEventHandler, createEventStream, } from "h3";

export var EVENT_STREAM_CLIENTS: any[] = [];


export default defineEventHandler(async (event) => {

  const newStream = createEventStream(event)

  newStream.onClosed(async () => {
      await newStream.close()
  })
  EVENT_STREAM_CLIENTS.push(newStream)

  return newStream.send();
})
