from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from core.deps import get_current_user, get_db
from models import Conversation, Message, User
from schemas import ChatRequest, ChatResponse, ConversationResponse, MessageResponse
from services.ai_service import generate_ai_response, stream_ai_response

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.get("/conversations", response_model=list[ConversationResponse])
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
        .all()
    )
    return conversations


@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
        .first()
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation


@router.post("/chat", response_model=ChatResponse)
async def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if payload.conversation_id:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == payload.conversation_id, Conversation.user_id == current_user.id)
            .first()
        )
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        title = payload.message[:50] + ("..." if len(payload.message) > 50 else "")
        conversation = Conversation(user_id=current_user.id, title=title)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    user_msg = Message(conversation_id=conversation.id, role="user", content=payload.message)
    db.add(user_msg)
    db.commit()

    history = (
        db.query(Message)
        .filter(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
        .all()
    )
    ai_messages = [{"role": m.role, "content": m.content} for m in history]

    response_text = await generate_ai_response(ai_messages)

    assistant_msg = Message(conversation_id=conversation.id, role="assistant", content=response_text)
    db.add(assistant_msg)
    conversation.updated_at = datetime.utcnow()
    db.commit()

    return ChatResponse(conversation_id=conversation.id, message=response_text)


@router.post("/chat/stream")
async def chat_stream(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if payload.conversation_id:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == payload.conversation_id, Conversation.user_id == current_user.id)
            .first()
        )
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        title = payload.message[:50]
        conversation = Conversation(user_id=current_user.id, title=title)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    user_msg = Message(conversation_id=conversation.id, role="user", content=payload.message)
    db.add(user_msg)
    db.commit()

    history = (
        db.query(Message)
        .filter(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
        .all()
    )
    ai_messages = [{"role": m.role, "content": m.content} for m in history]

    async def event_generator():
        full_response = ""
        async for chunk in stream_ai_response(ai_messages):
            full_response += chunk
            yield chunk

        assistant_msg = Message(conversation_id=conversation.id, role="assistant", content=full_response)
        db.add(assistant_msg)
        conversation.updated_at = datetime.utcnow()
        db.commit()

    return StreamingResponse(event_generator(), media_type="text/plain")
