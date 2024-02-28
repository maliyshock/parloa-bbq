export function limit(string = "", limit = 0) {
  if (string.length > 0) {
    return string.length > limit ? string.substring(0, limit) + "..." : string;
  }

  return string;
}

export function generateRequirement(fieldName: string) {
  return {
    required: true,
    message: `Please input the ${fieldName}!`,
  };
}

export function generateRandomString(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function generateID() {
  const segments = [8, 4, 4, 4, 12];

  return segments.map((item) => generateRandomString(item)).join("-");
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
