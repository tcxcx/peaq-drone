import { Sdk } from "@peaq-network/sdk";
import { cryptoWaitReady } from "@polkadot/util-crypto";


// If console shows error insufficent funds, add your wallet seed phrase and get in funded in the peaq network discord server's faucet
const mnemonicSeed = process.env.NEXT_PUBLIC_POLKADOT_DEV_PHRASE;

export const createPeaqDID = async (name) => {
  await cryptoWaitReady();

  const sdkInstance = await Sdk.createInstance({
    baseUrl: "wss://wsspc1-qa.agung.peaq.network",
    seed: mnemonicSeed,
  });

  try {
    const { hash } = await sdkInstance.did.create({ name });
    return hash;
  } catch (error) {
    console.error("Error creating DID:", error);
    throw error;
  } finally {
    await sdkInstance.disconnect();
  }
};
