import { PublicKey, ComputeBudgetProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

(async () => {
  const wallet = pg.wallet;
  const program = pg.program;
  const ROUND_INDEX = 0;
  const GLOBAL_STATE_SEED = "GLOBAL-STATE-SEED";
  const ROUND_STATE_SEED = "ROUND-STATE-SEED";
  const VAULT_SEED = "VAULT_SEED";

  const [globalStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_STATE_SEED)],
    program.programId
  );
  const roundIndex = new anchor.BN(ROUND_INDEX);
  const [roundStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(ROUND_STATE_SEED), roundIndex.toArrayLike(Buffer, "le", 4)],
    program.programId
  );

  const [vaultPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );
  const tx = await program.methods
    .joinRound(ROUND_INDEX)
    .accounts({
      user: wallet.publicKey,
      //@ts-ignore
      globalState: globalStatePDA,
      roundState: roundStatePDA,
      vault: vaultPDA,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
  console.log(`Tx: https://https://solscan.io/tx/${tx}`);
  console.log(`Joined index ${ROUND_INDEX} successfully`);
})();
