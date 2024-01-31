export function checkEnvVariable(name: string | string[], errorMessage?: string) {
  let nameList = typeof name === "string" ? [name] : name;
  for (const name of nameList) {
    if (!process.env[name]) {
      throw new Error((errorMessage ? errorMessage + ": " : "") + `env variable ${name} not defined`);
    }
  }
}
