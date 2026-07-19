from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS,
    ALGORITHM,
    SECRET_KEY,
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# =====================================================
# PASSWORD FUNCTIONS
# =====================================================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# =====================================================
# JWT TOKEN CREATION
# =====================================================

def _create_token(
    data: dict,
    expires_delta: timedelta,
    token_type: str,
) -> str:
    payload = data.copy()

    expire = datetime.now(timezone.utc) + expires_delta

    payload.update(
        {
            "exp": expire,
            "type": token_type,
        }
    )

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(data: dict) -> str:
    return _create_token(
        data=data,
        expires_delta=timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        ),
        token_type="access",
    )


def create_refresh_token(data: dict) -> str:
    return _create_token(
        data=data,
        expires_delta=timedelta(
            days=REFRESH_TOKEN_EXPIRE_DAYS
        ),
        token_type="refresh",
    )


# =====================================================
# TOKEN DECODER
# =====================================================

def decode_token(token: str) -> dict[str, Any] | None:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        return payload
    except JWTError:
        return None


def decode_access_token(token: str) -> dict[str, Any] | None:
    payload = decode_token(token)

    if not payload:
        return None

    if payload.get("type") != "access":
        return None

    return payload


def decode_refresh_token(token: str) -> dict[str, Any] | None:
    payload = decode_token(token)

    if not payload:
        return None

    if payload.get("type") != "refresh":
        return None

    return payload