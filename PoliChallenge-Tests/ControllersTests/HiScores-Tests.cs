using System;
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

namespace PoliChallenge_Tests._Core
{
    [TestFixture]
    public class HiScores_Tests : ContextDependent, IQueryDataTests, IAddDataTests
    {
        private HiScoresController controller;

        [SetUp]
        public void SetUp()
        {
            controller = new HiScoresController()
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
        }

        [TestCase]
        public void Should_Add_Entity()
        {
            var response = controller.Post(Store.TestHiScore);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            var allHiScores = controller.Get().Content.ReadAsAsync<IEnumerable<HiScoreDTO>>().Result.ToList();

            Assert.True(allHiScores.DoesContain(Store.TestHiScore));
            Assert.True(allHiScores.Count == dbContext.HiScores.Count());
        }

        [TestCase]
        public void Should_Not_Add_Invalid_Entity()
        {
            var badFormatHiScore = Store.TestHiScore;
            badFormatHiScore.TeamName = string.Empty;

            Assert.Throws<ArgumentException>(() => controller.Post(badFormatHiScore));
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
