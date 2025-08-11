from supabase import create_client, Client
import os
from dotenv import load_dotenv
load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(url, key)

def insert_member(
    name: str,
    email: str,
    phone: str,
    department: str,
    year: str,
    github_url: str | None,
    linkedin_url: str | None,
    portfolio: str | None,
    volunteering: bool,
    is_available: bool,
    skills: str | None,
    member_id: str,
    password: str
):
    mem = supabase.table("members").select("*").eq("email", email).execute()
    if mem.data:
        print("Member already exists:", mem.data)
        return False
    data = {
        "name": name,
        "email": email,
        "phone": phone,
        "department": department,
        "year": year,
        "github_url": github_url,
        "linkedin_url": linkedin_url,
        "portfolio": portfolio,
        "volunteering": volunteering,
        "is_available": is_available,
        "skills": skills,
        "member_id": member_id,
        "password": password
    }

    result = supabase.table("members").insert(data).execute()
    print("Insert result:", result)
    return True

def get_members():
    members = supabase.table("members").select("name").execute()
    if not members.data:
        return []
    return [x['name'] for x in members.data]

def get_time_sorted():
    members = supabase.table("members").select("name").order("created_at", desc=True).execute()
    if not members.data:
        return []
    return [x['name'] for x in members.data]

def get_volunteers():
    members = supabase.table("members").select("name").eq("volunteering", True).execute()
    if not members.data:
        return []
    return [x['name'] for x in members.data]
 