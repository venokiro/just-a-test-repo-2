import { defineIndexer } from "@apibara/indexer";
import { useLogger } from "@apibara/indexer/plugins";
import { drizzleStorage } from "@apibara/plugin-drizzle";
import { StarknetStream } from "@apibara/starknet";
import type { ApibaraRuntimeConfig } from "apibara/types";
import { getDrizzlePgDatabase } from "../lib/db";

export default function (runtimeConfig: ApibaraRuntimeConfig) {
  const indexerId = "myIndexer";
  const { startingBlock, streamUrl, postgresConnectionString } =
    runtimeConfig[indexerId];
  const { db } = getDrizzlePgDatabase(postgresConnectionString);

  return defineIndexer(StarknetStream)({
    streamUrl,
    finality: "accepted",
    startingBlock: BigInt(startingBlock),
    filter: {
      header: "always",
    },
    plugins: [drizzleStorage({ db, persistState: true })],
    async transform({ endCursor, finality }) {
      const logger = useLogger();

      logger.info(
        "Transforming block | orderKey: ",
        endCursor?.orderKey,
        " | finality: ",
        finality,
      );

      // Example snippet to insert data into db using drizzle with postgres
      //   const { db } = useDrizzleStorage();
      //   const { logs } = block;
      //   for (const log of logs) {
      //     await db.insert(exampleTable).values({
      //       number: Number(endCursor?.orderKey),
      //       hash: log.transactionHash,
      //     });
      //   }
    },
  });
}
