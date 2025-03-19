import {pipeline} from "@huggingface/transformers";

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
const output = await extractor('This is a simple test.', {pooling: 'mean', normalize: true});
// Tensor {
//   type: 'float32',
//   data: Float32Array [0.09094982594251633, -0.014774246141314507, ...],
//   dims: [1, 384]
// }

console.log(output.data, output.size, output.dims);
