export default function getUrl(url: string): string {
  return process.env.RUNTIME_ENV === 'client' ?
    url :
    `http://localhost:${process.env.PORT}${url}`;
}
