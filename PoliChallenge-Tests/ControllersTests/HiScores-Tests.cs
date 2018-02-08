using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NUnit.Framework;
using PoliChallenge.Business.HiScores;
using PoliChallenge.Controllers;
using PoliChallenge_Tests.Contracts;
using PoliChallenge_Tests.Core;
using PoliChallenge_Tests._Core;

namespace PoliChallenge_Tests.ControllersTests
{
    [TestFixture]
    public class HiScores_Tests : ContextDependent, IQueryDataTests, IAddDataTests, IDeleteDataTests
    {
        private HiScoresController controller = new HiScoresController()
        {
            Request = new System.Net.Http.HttpRequestMessage(),
            Configuration = new HttpConfiguration()
        };

        [TestCase]
        public void Should_Add_Entity()
        {
            

        }

        [TestCase]
        public void Should_Not_Add_Invalid_Entity()
        {

        }

        [TestCase]
        public void Should_Delete_Entity()
        {

        }

        [TestCase]
        public void Should_Throw_Error_On_Not_Existing_Key_For_Delete()
        {

        }
        
        [TestCase]
        public void Should_Fetch_All()
        {
            var response = controller.Get();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var result = response.Content.ReadAsAsync<IEnumerable<HiScoreDTO>>().Result.ToList();
            var dbResult = dbContext.HiScores.ToList().AsDTOs();

            Assert.IsTrue(result.IsSameByValue(dbResult));
        }
    }
}
