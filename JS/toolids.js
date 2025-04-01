import { createDigitalClock } from "./digitalclock";
import { createAnalogClock } from "./analogclock";
import { createStopWatch } from "./stopwatch";

const { createStickyNote } = require("./stickynote");

const toolIds = {
    'stickyNote': createStickyNote,
    'digitalClock': createDigitalClock,
    'analogClock': createAnalogClock,
    'stopWatch': createStopWatch,
}


export default toolIds;