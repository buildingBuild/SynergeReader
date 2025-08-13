from fastapi import FastAPI, UploadFile, File
from chunking import chunk_text
from embedding import embed_chunks

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    text = (await file.read()).decode("utf-8")
    chunks = chunk_text(text)
    embeddings = embed_chunks(chunks)
    return {"chunks": chunks, "embeddings": embeddings}