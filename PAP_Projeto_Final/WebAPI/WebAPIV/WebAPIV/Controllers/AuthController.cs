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

        [HttpPost("AdminUtilizadorPdf")]
        public IActionResult AdminUtilizadorPdf([FromBody] AdminPdf pdf)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select Utilizadores.Nome,Questionario.Descricao,Questionarios_Respondidos.Classificacao from Utilizadores join Questionarios_Respondidos on Questionarios_Respondidos.UserID = Utilizadores.UserID  join Questionario on Questionario.QuestionarioID = Questionarios_Respondidos.QuestionarioID where Utilizadores.UserID = @UserID", pdf);

                if (re == null)
                {
                    return NotFound();
                }

                return Ok(re);

            }
        }

        [HttpPost("AdminGPerguntasPdf")]
        public IActionResult AdminGPerguntasPdf([FromBody] AdminPdf pdf)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select GPerguntas.GDescricao,GPR.Valor,Questionario.Descricao from GPerguntas join GPR on GPR.GPerguntasID = GPerguntas.GPerguntasID join Questionario on Questionario.QuestionarioID = GPerguntas.QuestionarioID where GPR.UserID = @UserID", pdf);

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

        [HttpGet("AdminUsers")]
        public IActionResult AdminUsers()
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var re = conn.Query("select * from Utilizadores");

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
            user.Password = SHACode.generateHash(user.Password);
            using (var conn = new SqlConnection(Strings.connectionString))
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
                var res = conn.QueryFirstOrDefault("Select Username, Nome, Email, Password, IsAdmin from Utilizadores where UserID=@UserID",user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }



        [HttpPut("UpdateUser{id}")]
        //[FromBody]
        public IActionResult UpdateUser(int id, [FromBody] NomeModel user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET  Username=@Username , Nome=@Nome, Email=@Email, IsAdmin=@IsAdmin  where UserID=" + id, user);
                if (res != null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }


        [HttpPost("UpdateUserPassword")]
        //[FromBody]
        public IActionResult UpdateUserPassword([FromBody] UserPassword user)
        {
            user.Password = SHACode.generateHash(user.Password);
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var res = conn.QueryFirstOrDefault("Update Utilizadores SET  Password=@Password  where UserID=@UserID", user);
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
                user.Password = SHACode.generateHash(user.Password);
              var res = conn.Execute("Insert into Utilizadores values (@Username, @Nome, @Password, @Email, @IsAdmin)", user);
              return Ok(res);
            }
        }

        [HttpPost("QuestionarioRespondidoDelete")]
        public IActionResult QuestionarioDelete([FromBody] QuestionarioDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from Questionarios_Respondidos where UserID = @UserID and QuestionarioID = @QuestionarioID ", user);
                if (verify == null)
                {

                    return NotFound();

                }

                var res = conn.Execute("delete from Questionarios_Respondidos where UserID = @UserID and QuestionarioID = @QuestionarioID", user);
                return Ok(res);
            }
        }

        [HttpPost("QuestionarioRDelete")]
        public IActionResult QuestionarioRDelete([FromBody] UserDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {

                var res = conn.QueryFirstOrDefault("delete from Questionarios_Respondidos where UserID=@UserID", user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPost("UserDelete")]
        public IActionResult UserDelete([FromBody] UserDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {

                var res = conn.QueryFirstOrDefault("delete from Utilizadores where UserID=@UserID", user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPost("GPRDelete")]
        public IActionResult GPRDelete([FromBody] GPRDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {

                var res = conn.QueryFirstOrDefault("delete from GPR where UserID=@UserID", user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPost("RespostasUserDelete")]
        public IActionResult RespostasUserDelete([FromBody] RespostasUserDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {

                var res = conn.QueryFirstOrDefault("delete from Respostas where UserID=@UserID", user);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
        }

        [HttpPost("RespostasDelete")]
        public IActionResult RespostasDelete([FromBody] QuestionarioDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from Respostas where UserID = @UserID and QuestionarioID = @QuestionarioID ", user);
                if (verify == null)
                {

                    return NotFound();

                }

                var res = conn.Execute("delete from Respostas where UserID = @UserID and QuestionarioID = @QuestionarioID", user);
                return Ok(res);
            }
        }

        [HttpPost("GPRDeleteQ1")]
        public IActionResult GPRDelete1([FromBody] GPRDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from GPR where UserID = @UserID and GPerguntasID >= 1 and GPerguntasID <= 8", user);
                if (verify == null)
                {

                    return NotFound();
                    

                }

                var res = conn.Execute("delete from GPR where UserID = @UserID and GPerguntasID >= 1 and GPerguntasID <= 8", user);
                return Ok(res);
            }
        }

        [HttpPost("GPRDeleteQ2")]
        public IActionResult GPRDelete2([FromBody] GPRDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from GPR where UserID = @UserID and GPerguntasID >= 9 and GPerguntasID <= 16", user);
                if (verify == null)
                {

                    return NotFound();

                }

                var res = conn.Execute("delete from GPR where UserID = @UserID and GPerguntasID >= 9 and GPerguntasID <= 16", user);
                return Ok(res);
            }
        }

        [HttpPost("GPRDeleteQ3")]
        public IActionResult GPRDelete3([FromBody] GPRDelete user)
        {
            using (var conn = new SqlConnection(Strings.connectionString))
            {
                var verify = conn.QueryFirstOrDefault("Select * from GPR where UserID = @UserID and GPerguntasID >= 17 and GPerguntasID <= 24", user);
                if (verify == null)
                {

                    return NotFound();

                }

                var res = conn.Execute("delete from GPR where UserID = @UserID and GPerguntasID >= 17 and GPerguntasID <= 24", user);
                return Ok(res);
            }
        }


    }
}
