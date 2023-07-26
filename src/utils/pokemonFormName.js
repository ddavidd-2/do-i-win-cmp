export default function getFormName(name, form) {
  let displayName = `${name}`;
  if (form !== "Normal") {
    displayName += ` (${form})`;
  }
  return displayName;
}