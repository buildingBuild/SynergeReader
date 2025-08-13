def chunk_text(text: str, max_chunk_size: int = 500) -> list:
    words = text.split()
    chunks = []
    current_chunk = []

    for word in words:
        if sum(len(w) for w in current_chunk) + len(word) <= max_chunk_size:
            current_chunk.append(word)
        else:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks