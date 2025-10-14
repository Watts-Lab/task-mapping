import { TimeSync } from "meteor/mizzao:timesync";

export function getServerTime() {
  return TimeSync.serverTime(null, 1000);
}

export function logAction(player, verb, object, target) {
  logEntry(player, "action", { verb, object, target });
}

export function logEntry(player, name, entry) {
  player.log(name, { ...entry, at: getServerTime() });
}
