import wallet from "../turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://devnet.irys.xyz/B3QsqvRgmemVQXDwVaanMBmJM2UDBstfWvbbghhkJNMK";
    const metadata = {
      name: "0xyuki3",
      symbol: "YUKI",
      description: "this is a test NFT",
      image: image,
      attributes: [{ trait_type: "colors", value: "20" }],
      properties: {
        files: [
          {
            type: "image/png",
            uri: "image",
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson([metadata]);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
