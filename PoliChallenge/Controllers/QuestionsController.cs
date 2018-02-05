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
            var questionsForId = _repo.Query().Where(x => x.Key == Id).ToList().AsDTOs();

            return Request.CreateResponse(HttpStatusCode.OK, questionsForId);
        }

        [Route("")]
        public HttpResponseMessage Post(QuestionDTO dto)
        {
            _repo.Add(dto);
            _repo.Save();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [Route("")]
        public HttpResponseMessage Put(QuestionDTO dto)
        {
            _repo.Put(dto);
            _repo.Save();

            return Request.CreateResponse(204);
        }

        [Route("")]
        public HttpResponseMessage Delete(Guid key)
        {
            _repo.Delete(_repo.Query().Single(x => x.Key == key));
            _repo.Save();

            return Request.CreateResponse(204);
        }
    }
}
