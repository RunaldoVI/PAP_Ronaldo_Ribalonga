using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebAPIV.Models;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPIV.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        [HttpPost("Questionarios")]
        public IActionResult Questionarios([FromBody] Questionario questionario)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Select * from Questionario where QuestionarioID = @QuestionarioID", questionario);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }
        }




        [HttpGet("Questionario")]
        public IActionResult Questionario()
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Select * from Questionario");

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }
        }


        [HttpGet("AdminQuestionario")]
        public IActionResult AdminQuestionario()
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select Questionarios_Respondidos.UserID,Utilizadores.Nome, Questionarios_Respondidos.Classificacao, Questionarios_Respondidos.Data,Questionario.Descricao,Questionario.QuestionarioID from Questionarios_Respondidos join Questionario on Questionario.QuestionarioID = Questionarios_Respondidos.QuestionarioID join Utilizadores on Utilizadores.UserID = Questionarios_Respondidos.UserID");

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }
        }


        [HttpPut("Respostas")]
             public IActionResult Respostas([FromBody] Respostas respostas)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Insert into Respostas values (@Valor, @PerguntasID, @UserID, @GPerguntasID, @QuestionarioID)", respostas);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }


        [HttpPost("QuesRespondido")]
        public IActionResult GRespostas([FromBody] QuesRespondido QRespondido)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Select * from Questionarios_Respondidos where UserID = @UserID", QRespondido);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }

        [HttpPut("GRespostas")]
        public IActionResult GRespostas([FromBody] GRespostas Grespostas)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Insert into GPR values (@UserID, @GPerguntasID, @Valor)", Grespostas);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }




        [HttpPut("QuestionarioRespondido")]
        public IActionResult QuestionarioRespondido([FromBody] QRespondido Respondido)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {

                var re = conn.Query("Insert into Questionarios_Respondidos values (@UserID, @QuestionarioID, @Classificacao, @Data)", Respondido);
 
                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }

        [HttpPost("Perguntas")]
        public IActionResult Perguntas([FromBody] Perguntas perguntas)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
               var re = conn.Query("Select * from Perguntas where QuestionarioID = @QuestionarioID", perguntas);
                
                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);
                
            }

        }


        [HttpPost("RespostasSumar")]
        public IActionResult RespostasSumar([FromBody] RespostasSum Respostas)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("Select * from Respostas where UserID = @UserID and QuestionarioID = @QuestionarioID", Respostas);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }

        [HttpPost("QuestionarioDetalhes")]
        public IActionResult QuestionarioDetalhes([FromBody] QuesDetalhes Detalhes)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select Utilizadores.UserID, Utilizadores.Nome, Questionario.Descricao , Questionarios_Respondidos.Classificacao , Questionarios_Respondidos.Data from Utilizadores JOIN Questionarios_Respondidos on Utilizadores.UserID = Questionarios_Respondidos.UserID JOIN Questionario on Questionario.QuestionarioID = Questionarios_Respondidos.QuestionarioID where Utilizadores.UserID = @UserID", Detalhes);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }

        }

        [HttpPost("GPerguntasDetalhes")]
        public IActionResult GPerguntasDetalhes([FromBody] GPerguntas Detalhes)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select Questionario.Descricao, GPerguntas.GDescricao , GPR.Valor from Questionario JOIN GPerguntas on Questionario.QuestionarioID = GPerguntas.QuestionarioID JOIN GPR on GPR.GPerguntasID = GPerguntas.GPerguntasID JOIN Utilizadores on Utilizadores.UserID = GPR.UserID where Utilizadores.UserID = @UserID and Questionario.QuestionarioID = @QuestionarioID order by GPerguntas.GPerguntasID", Detalhes);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

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

        // POST: api/<AuthController>/Users
        [HttpPost("Users")]
        //[FromBody]
        public IActionResult Users([FromBody] UserShow user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Select Username, Nome, Email, IsAdmin from Utilizadores where UserID=@UserID",user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }


        [HttpPut("User{id}")]
        //[FromBody]
        public IActionResult Username(int id,[FromBody] UsernameModel user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET Username=@Username where UserID="+id, user);
                if (res != null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPut("Nome{id}")]
        //[FromBody]
        public IActionResult Nome(int id, [FromBody] NomeModel user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET  Nome=@Nome  where UserID=" + id, user);
                if (res != null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }
        [HttpPut("Password{id}")]
        //[FromBody]
        public IActionResult Password(int id, [FromBody] PasswordModel user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET  Password=@Password  where UserID=" + id, user);
                if (res != null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPut("Email{id}")]
        //[FromBody]
        public IActionResult Email(int id, [FromBody] EmailModel user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET Email=@Email where UserID=" + id, user);
                if (res != null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }
        [HttpDelete("UserDelete")]
        //[FromBody]
        public IActionResult UserDelete([FromBody] UserShow user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Delete From Utilizadores where UserID=@UserID", user);
                if (res != null)
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
