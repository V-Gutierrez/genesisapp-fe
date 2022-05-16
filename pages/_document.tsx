import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
            integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
            crossOrigin=""
          />
          <script
            src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
            integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
            crossOrigin=""
          />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="Genesis Church App" />

          <meta name="title" content="Genesis Church" />
          <meta name="description" content="Bem-vindo à Gênesis Church" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://genesisproject-six.vercel.app" />
          <meta property="og:title" content="Genesis Church" />
          <meta property="og:description" content="Bem-vindos à Gênesis Church" />
          <meta property="og:image" content="/meta-bg.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://genesisproject-six.vercel.app" />
          <meta property="twitter:title" content="Genesis Church" />
          <meta property="twitter:description" content="Bem-vindos à Gênesis Church" />
          <meta property="twitter:image" content="/meta-bg.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
