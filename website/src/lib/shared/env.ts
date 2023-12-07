export function chechEnvVariable(name: string, errorMessage?: string) {
  if (!process.env[name]) {
    throw new Error(
      (errorMessage ? errorMessage + ": " : "") +
        `env variable ${name} not defined`
    );
  }
}
