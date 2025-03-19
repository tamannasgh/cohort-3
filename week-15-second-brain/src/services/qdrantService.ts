import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

const client = new QdrantClient({
	url: process.env.QDRANT_URL,
	apiKey: process.env.QDRANT_API_KEY,
});

const collectionName = "second-brain";

export async function setupQDb() {
	try {
		const { exists: collectionExists } = await client.collectionExists(
			collectionName
		);
		if (!collectionExists) {
			const collection = await client.createCollection(collectionName, {
				vectors: {
					size: 384,
					distance: "Cosine",
				},
			});
			console.log("collection created: ", collectionName);
		} else {
			console.log("collection already exists:", collectionName);
		}
	} catch (err) {
		console.log("error: ", err);
	}
}
