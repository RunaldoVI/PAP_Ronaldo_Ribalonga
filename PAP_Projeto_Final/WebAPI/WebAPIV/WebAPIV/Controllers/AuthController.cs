using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebAPIV.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPIV.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        

        [HttpGet("Perguntas")]
        public IActionResult Perguntas()
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
               var re = conn.QueryFirstOrDefault("Select * from Perguntas");
                
                if (re == null)
                {
                    return NotFound();
                }

               return 
                
            }

        }

        // GET: api/<AuthController>/Login
        [HttpPost("login")]
        //[FromBody]
        public IActionResult Login([FromBody]UserToLogin user)
        {
            using(var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Select UserID, Username, Nome, Email from Utilizadores where Username=@Username and Password=@Password",user);
                if(res==null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        // POST: api/<AuthController>/SignUp
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserToAuth user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from Utilizadores where Username=@Username or Nome=@Nome or Email=@Email ", user);
                if(verify != null)
                {

                    return NotFound();

                }
               
              var res = conn.Execute("Insert into Utilizadores values (@Username, @Nome, @Password, @Email, @IsAdmin)", user);
              return Ok(res);
            }
        }
    }
}
