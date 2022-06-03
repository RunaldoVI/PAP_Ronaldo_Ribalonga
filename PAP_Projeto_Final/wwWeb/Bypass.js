const UserID4 = localStorage.getItem("UserIDStore");
const myUserIDStore4 = JSON.parse(UserID4);

if(myUserIDStore4 == null)
{
    window.location.href = "../Login&Register/register.html"
}
