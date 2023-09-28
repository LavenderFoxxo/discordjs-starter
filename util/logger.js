function log(message, level) {
  const colorMap = {
    info: "blue",
    log: "green",
    debug: "gray",
  };

  const color = colorMap[level] || "black";
  const coloredMessage = `%c[${level.toUpperCase()}] ${message}`;
  const style = `color: ${color};`;

  switch (level) {
    case "info":
      console.info(coloredMessage, style);
      break;
    case "log":
      console.log(coloredMessage, style);
      break;
    case "debug":
      console.debug(coloredMessage, style);
      break;
    default:
      console.log(coloredMessage, style);
  }
}

module.exports = log;