import WalletConnectProvider from '@walletconnect/web3-provider'

export const config = {
  contract: {
    proofofhumanity: '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb',
    ubi: '0xdd1ad9a21ce722c151a836373babe42c868ce9a4'
  },
  provider: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '',
      }
    }
  },
  relay: {
    server: 'localhost',
    port: 9000,
    path: '/myapp'
  },
  i18n: {
    lng: 'en'
  }
}
