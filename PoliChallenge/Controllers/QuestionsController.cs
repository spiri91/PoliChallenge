using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using PoliChallenge.Business.Questions;
using PoliChallenge.Contracts;
using System.Web.Http;
using System.Web.OData;
using PoliChallenge.Business._Core;

namespace PoliChallenge.Controllers
{
    [CustomAuthorize]
    [CustomExceptionHandling]
    [RoutePrefix("api/questions")]
    public class QuestionsController : ApiController
    {
        private readonly IRepository<Question> _repo;

        public QuestionsController(IRepository<Question> questionsRepository)
        {
            _repo = questionsRepository;
        }

        public QuestionsController() : this(new QuestionsRepository()) { }

        /// <summary>
        /// OData enabled
        /// Gets all the questions in the game
        /// </summary>
        /// <returns code="200"></returns>
        [Route("")]
        [EnableQuery]
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            var questionsForId = _repo.FetchAll().ToList().AsDTOs();

            return Request.CreateResponse(HttpStatusCode.OK, questionsForId);
        }

        /// <summary>
        /// Creates a new Question if valid
        /// Doesn't return the newly created item!
        /// </summary>
        /// <param name="dto"></param>
        /// <returns code="201"></returns>
        [Route("")]
        public HttpResponseMessage Post(QuestionDTO dto)
        {
            _repo.Add(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        /// <summary>
        /// It changes the entity with this , if one is already present in the DB
        /// </summary>
        /// <param name="dto"></param>
        /// <returns code="204"></returns>
        [Route("")]
        public HttpResponseMessage Put(QuestionDTO dto)
        {
            _repo.Put(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Deletes the entity with the provided key
        /// </summary>
        /// <param name="key"></param>
        /// <returns code="204"></returns>
        [Route("{key}")]
        public HttpResponseMessage Delete(Guid key)
        {
            _repo.Delete(_repo.Query().Single(x => x.Key == key));
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
