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
 
def get_phone_numbers():
    members = supabase.table("members").select("phone").execute()
    if not members.data:
        return []
    return [x['phone'] for x in members.data]

def get_member_by_id(member_id: str):
    member = supabase.table("members").select("*").eq("member_id", member_id).execute()
    if not member.data:
        return None
    return member.data[0]


def add_registration(member_id: str, track: str):
    member_query = supabase.table("members").select("events").eq("member_id", member_id).execute()

    if not member_query.data:
        print(f"Error: Member with ID '{member_id}' not found.")
        return False

    current_events = member_query.data[0].get('events') or {}

    if 'sprint' in current_events and current_events['sprint']:
        existing_track = current_events['sprint']
        print(f"Member '{member_id}' is already registered for track '{existing_track}'. Cannot register again.")
        return False
    
    current_events['sprint'] = track
    
    result = supabase.table("members").update({"events": current_events}).eq("member_id", member_id).execute()

    print(f"Successfully registered member '{member_id}' for sprint track: '{track}'.")
    return True
