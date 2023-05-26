import React from 'react'

class ReactOneSignal extends React.Component {
  oneSignal = () => ({
    __html: `window.OneSignal = window.OneSignal || []; OneSignal.push(function() { OneSignal.init({ appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}", safari_web_id: "${process.env.NEXT_PUBLIC_SAFARIWEBID}", welcomeNotification: { disable: false, enabled: true }, promptOptions: { slidedown: { enabled: true, actionMessage: "Gostaria de receber notificações para as últimas novidades e atualizações?", acceptButtonText: "SIM", cancelButtonText: "NÃO" } } });});`,
  })

  render() {
    return (
      <>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
        <script dangerouslySetInnerHTML={this.oneSignal()} />
      </>
    )
  }
}

export default ReactOneSignal
