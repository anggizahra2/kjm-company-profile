# Auth Testing Playbook (JWT Admin)

Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, indexes exist on users.email (unique), login_attempts.identifier.

Step 2: API Testing
```
curl -c cookies.txt -X POST $API_URL/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@nusaenvirolestari.co.id","password":"NusaAdmin2026!"}'
cat cookies.txt
curl -b cookies.txt $API_URL/api/auth/me
```
Login returns the user object and sets `access_token` cookie. `/me` returns the same user using the cookie.

Brute force: 5 failed logins on same ip:email => 429 for 15 minutes.
