type EventTypes = "scrollUp" | "scrollDown" | "keyPress" | "keyRelease";

type ScrollEvents = Exclude<EventTypes, "keyPress" | "keyRelease">

function scrollDirection(direction: ScrollEvents){
  console.log(direction);
}

// scrollDirection("keyPress");   //this will give error.
scrollDirection("scrollUp");  