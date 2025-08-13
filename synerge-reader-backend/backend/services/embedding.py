from sentence_transformers import SentenceTransformer

model = SentenceTransformer("Qwen/Qwen3-Embedding-0.6B")

def embed_chunks(chunks: list) -> list:
    embeddings = model.encode(chunks, convert_to_numpy=True).tolist()
    return embeddings