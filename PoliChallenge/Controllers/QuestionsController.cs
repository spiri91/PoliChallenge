using PoliChallenge.Business.Questions;
using PoliChallenge.Contracts;
using System.Web.Http;

namespace PoliChallenge.Controllers
{
    public class QuestionsController : ApiController
    {
        private readonly IRepository<Question> _repo;

        public QuestionsController(IRepository<Question> questionsRepository)
        {
            _repo = questionsRepository;
        }
    }
}
