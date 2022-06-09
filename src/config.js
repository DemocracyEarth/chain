import WalletConnectProvider from '@walletconnect/web3-provider'

export const config = {
  contract: {
    proofofhumanity: '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb'
  },
  provider: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'INSERT_INFURA_ID_HERE',
      }
    }
  },
  relay: {
    server: 'localhost',
    port: 9000,
    path: '/myapp'
  }
}
