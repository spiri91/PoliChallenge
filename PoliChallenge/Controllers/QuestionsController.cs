using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using PoliChallenge.Business.Questions;
using PoliChallenge.Contracts;
using System.Web.Http;

namespace PoliChallenge.Controllers
{
    [RoutePrefix("api/questions")]
    public class QuestionsController : ApiController
    {
        private readonly IRepository<Question> _repo;

        public QuestionsController(IRepository<Question> questionsRepository)
        {
            _repo = questionsRepository;
        }

        public QuestionsController() : this(new QuestionsRepository()) { }

        [Route("{id}")]
        public HttpResponseMessage Get(Guid Id)
        {
            var questionsForId = _repo.Query().Where(x => x.Key == Id).AsDTOs();

            return Request.CreateResponse(HttpStatusCode.OK, questionsForId);
        }

        [Route("")]
        public HttpResponseMessage Post(QuestionDTO dto)
        {
            _repo.Add(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
