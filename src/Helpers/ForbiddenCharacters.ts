export default function HasForbiddenCharacters(input: string):[boolean,string]
{
  const forbiddenCharacters: string[] = [
    "<",
    ">",
    "/",
    "=",
    "&",
    "\\",
    "--",
    "`",
    "$",
    "|",
    "{",
    "}",
    "[",
    "]",
    "*",
    "<script",
  ];

  const wordArray = input.match(/\S+/g);
  const baseLetterArray = Array.from(input);
  const cleansedLetterArray = baseLetterArray.filter(
    (letter) => letter !== "" && letter !== " "
  );

  for (const fch of forbiddenCharacters) {
    if (input.includes(fch)) {
      return [true,fch]
    }
  }

  for (const fch of forbiddenCharacters) {
    if (cleansedLetterArray.includes(fch)) {
      return [true,fch]
    }
  }

  return [false,""]
}