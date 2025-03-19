import { pipeline } from "@huggingface/transformers";

export default async function getEmbedding(input: string) {
	const extractor = await pipeline(
		"feature-extraction",
		"Xenova/all-MiniLM-L6-v2"
	);
	const output = await extractor(input, {
		pooling: "mean",
		normalize: true,
	});
	return output;
}

// Tensor {
//   type: 'float32',
//   data: Float32Array [0.09094982594251633, -0.014774246141314507, ...],
//   dims: [1, 384]
// }
