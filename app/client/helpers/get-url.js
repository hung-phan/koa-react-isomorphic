export default function getUrl(url) {
  if (process.env.runtimeEnv === 'client') {
    return url;
  } else {
    return `http://localhost:${process.env.PORT || 3000}${url}`;
  }
}
