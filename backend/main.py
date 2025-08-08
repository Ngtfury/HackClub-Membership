from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import utils.database as db
import utils.emailsmtp as email
import random
from typing import Optional


class SubmitData(BaseModel):
  name: str
  email: str
  phone: str
  department: str
  year: str
  githubUrl: Optional[str] = None
  linkedinUrl: Optional[str] = None
  portfolio: Optional[str] = None
  hasExperience: Optional[str] = None
  isAvailable: Optional[str] = None
  skills: Optional[str] = None

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hack-club-membership.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post('/submit')
async def submit_data(data: SubmitData):
    if not data.name or not data.email or not data.phone or not data.department:
        return {"error": "Name, email, and phone are required fields."}
    member_id = "HC" + data.name.replace(" ", "")[:3].upper() + f"{random.randint(0,999):03}"
    passwd = f"{random.randint(10000, 99999)}"

    resdb = db.insert_member(
        name=data.name,
        email=data.email,
        phone=data.phone,
        department=data.department,
        year=data.year,
        github_url=data.githubUrl or None,
        linkedin_url=data.linkedinUrl or None,
        portfolio=data.portfolio or None,
        volunteering=data.hasExperience.lower() == 'yes',
        is_available=data.isAvailable.lower() == 'yes',
        skills=data.skills or None,
        member_id=member_id,
        password=passwd
    )
    if not resdb:
        return
    email.send_email(name=data.name, email=data.email, username=member_id, password=passwd)


@app.get('/members')
async def get_members():
    members = db.get_members()
    if not members:
        return {"error": "No members found."}
    return {"count": len(members), "members": members}

@app.get('/members/count')
async def get_member_count():
    members = db.get_members()
    if not members:
        return {"count": 0}
    return {"count": len(members)}

@app.get('/members/sorted')
async def get_sorted():
    members = db.get_time_sorted()
    if not members:
        return {"error": "No members found."}
    return {"count": len(members), "members": members}