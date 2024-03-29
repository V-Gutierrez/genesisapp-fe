import React from 'react'

class ReactOneSignal extends React.Component {
  oneSignal = () => ({
    __html: `
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.init({
          appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
          autoRegister: true,
          safari_web_id: "${process.env.NEXT_PUBLIC_SAFARIWEBID}",
          welcomeNotification: {
            disable: false,
            message: "Bem-vindo à Genesis Church!"
          },
          promptOptions: {
            slidedown: {
              enabled: true,
              actionMessage: "Gostaria de receber notificações para as últimas novidades e atualizações?",
              acceptButtonText: "SIM",
              cancelButtonText: "NÃO"
            }
          }
        });
      });
    `,
  })


  render() {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
      return null
    }

    return (
      <>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
        <script dangerouslySetInnerHTML={this.oneSignal()} />
      </>
    )
  }
}

export default ReactOneSignal
