import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
import base64
import os
load_dotenv()

img_path = os.path.join(os.path.dirname(__file__), "images", "hackclubasiet.png")
with open(img_path, "rb") as image_file:
    encoded_ = base64.b64encode(image_file.read()).decode('utf-8')
img_b64 = f'data:image/png;base64,{encoded_}'

def send_email(name, email, username, password):
    msg = EmailMessage()
    msg['Subject'] = "Welcome to HC ASIET, you're officially cool! 😎"
    msg['From'] = os.getenv('EMAIL_USER')
    msg['To'] = email

    body = f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Hack Club ASIET</title>
  <style>
    body {{
      font-family: 'SFMono-Regular', 'Courier New', Courier, monospace;
      background-color: #ffffff;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }}
    .container {{
      max-width: 600px;
      margin: 40px auto;
      background-color: #f9f9f9;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }}
    .header {{
      text-align: center;
      margin-bottom: 30px;
    }}
    .header img {{
      width: 120px;
      margin-bottom: 10px;
    }}
    h1 {{
      color: #ec3750;
      font-size: 24px;
    }}
    p {{
      font-size: 16px;
      line-height: 1.6;
    }}
    .credentials {{
      font-size: 16px;
      margin-top: 12px;
      background-color: #efefef;
      padding: 10px 16px;
      border-radius: 8px;
      line-height: 1.6;
      word-break: break-word;
    }}
    a.button {{
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #ec3750;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
    }}
    .footer {{
      margin-top: 40px;
      font-size: 14px;
      color: #555;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="{img_b64}" alt="Hack Club Logo">
      <h1>Welcome to Hack Club ASIET 🎉</h1>
    </div>

    <p>Hi <strong>{name}</strong>,</p>

    <p>A huge welcome to the <strong>Hack Club ASIET</strong> family!<br>
      We're so excited to have you join our community of builders and creators. So much more awaits you here!
    </p>

    <div class="credentials">
      Your official Hack Club membership ID is: <strong>{username}</strong><br>
      Your password is: <strong>{password}</strong>
    </div>

    <p><em>Keep these credentials safe for future events and logins.</em></p>

    <p>We have a dedicated WhatsApp group where you can connect with other members, share your projects, and stay updated on all our events.</p>

    <a href="https://chat.whatsapp.com/BS94cd3NQCB4s3QoV71wiN" class="button">Join the Community</a>

    <p>Happy hacking!</p>

    <p>Regards,<br>
      <strong>Team HC ASIET</strong>
    </p>

    <div class="footer">
      © Hack Club ASIET · Keep Building 🚀
    </div>
  </div>
</body>
</html>
"""
    
    msg.add_alternative(body, subtype='html')

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASSWORD'))
            server.send_message(msg)
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")
        
send_email("Sreeram", "sreerammakesstuff@gmail.com", "ee", "ee")
