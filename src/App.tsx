import React from 'react';
import { ConnectedWallet, usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'
import { Client } from '@xmtp/xmtp-js'

function App() {
  const { ready, login, logout, authenticated, user } = usePrivy()
  const { wallets } = useWallets()

  const getEthersSigner = async (wallets: ConnectedWallet[]) => {
    try {
      await wallets[0]?.switchChain(0x1);
      const injectProvider = await wallets[0].getEthereumProvider()
      const _provider = new ethers.providers.Web3Provider(injectProvider, 'any')
      const _signer = _provider.getSigner();

      return _signer
    } catch(e: unknown) {
      console.error(e)
    }
  }

  /**
   * @link https://xmtp.org/docs/build/authentication
   * @description TEST: first call create Identity, second call enable Identity
   */
  const connectXMTP = async () => {
    if (!user?.wallet || !wallets || !wallets[0]) return
    const signer = await getEthersSigner(wallets)
    if (!signer) return
    const client = await Client.create(signer, { env: 'production' })
    const address = user.wallet.address
    
    const isOnXmtpNetwork = await client.canMessage(address)

    if (!isOnXmtpNetwork) {
      alert('not on xmtp network')
    } else {
      alert('sucessfully enable Identity')
    }
  }

  return (
    <>
      { 
        ready &&
        (
          authenticated 
          ? 
          <>
            <div>{user?.wallet?.address}</div>
            <button onClick={connectXMTP}>connect xmtp</button>
            <button onClick={logout}>Log out</button>
          </>
          : 
          <button onClick={login}>Log in</button>
        )
      }
    </>
  );
}

export default App;
