using System.Web.Http;
using PoliChallenge.Business.Places;
using PoliChallenge.Contracts;

namespace PoliChallenge.Controllers
{
    public class PlacesController : ApiController
    {
        private readonly IRepository<Place> _repo;

        public PlacesController(IRepository<Place> placesRepository)
        {
            _repo = placesRepository;
        }

        public PlacesController() : this(new PlacesRepository()){ }
    }
}
