import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="google-site-verification"
            content="FhuMouOZ49hb9-ePxmq-rg-94lKGpK8hZI_Mxi77UIw"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            integrity="sha256-jySGIHdxeqZZvJ9SHgPNjbsBP8roij7/WjgkoGTJICk="
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            crossOrigin="anonymous"
            integrity="sha256-WmhCJ8Hu9ZnPRdh14PkGpz4PskespJwN5wwaFOfvgY8="
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
            rel="stylesheet"
            crossOrigin="anonymous"
          />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="Genesis Church App" />

          <meta name="title" content="Genesis Church" />
          <meta name="description" content="Bem-vindo à Gênesis Church" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.genesischurch.app/" />
          <meta property="og:title" content="Genesis Church" />
          <meta property="og:description" content="Bem-vindos à Gênesis Church" />
          <meta property="og:image" content="/meta-bg.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.genesischurch.app/" />
          <meta property="twitter:title" content="Genesis Church" />
          <meta property="twitter:description" content="Bem-vindos à Gênesis Church" />
          <meta property="twitter:image" content="/meta-bg.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
