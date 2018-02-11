using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using NUnit.Framework;
using PoliChallenge.Business.Questions;
using PoliChallenge.Controllers;
using PoliChallenge_Tests._Core;
using PoliChallenge_Tests.Contracts;
using PoliChallenge_Tests.Core;

namespace PoliChallenge_Tests.ControllersTests
{
    [TestFixture]
    public class QuestionsController_Tests : ContextDependent, IAddDataTests, IQueryDataTests, IDeleteDataTests, IPutDataTests
    {
        private QuestionsController controller;

        [SetUp]
        public void SetUp()
        {
            controller = new QuestionsController()
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
        }

        [TestCase]
        public void Should_Add_Entity()
        {
            var response = controller.Post(Store.TestQuestion);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);

            var questions = controller.Get().Content.ReadAsAsync<IEnumerable<QuestionDTO>>().Result.ToList();

            Assert.IsTrue(questions.DoesContain(Store.TestQuestion));
        }

        [TestCase]
        public void Should_Delete_Entity()
        {
            controller.Post(Store.TestQuestion);

            var questions = controller.Get().Content.ReadAsAsync<IEnumerable<QuestionDTO>>().Result.ToList();

            Assert.IsTrue(questions.DoesContain(Store.TestQuestion));

            var response = controller.Delete(Store.TestQuestion.Key.Value);

            Assert.IsTrue(HttpStatusCode.NoContent == response.StatusCode);

            questions = controller.Get().Content.ReadAsAsync<IEnumerable<QuestionDTO>>().Result.ToList();

            Assert.IsFalse(questions.DoesContain(Store.TestQuestion));
        }

        [TestCase]
        public void Should_Fetch_All()
        {
            var response = controller.Get();

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var result = response.Content.ReadAsAsync<IEnumerable<QuestionDTO>>().Result.ToList();
            var dbResult = dbContext.Questions.ToList().AsDTOs();

            Assert.IsTrue(result.IsSameByValue(dbResult));
        }

        [TestCase]
        public void Should_Not_Add_Invalid_Entity()
        {
            var questionDTO = Store.TestQuestion;

            questionDTO.Statement = string.Empty;
            questionDTO.CorrectAnswer = string.Empty;

            Assert.Throws<ArgumentException>(() => controller.Post(questionDTO));
        }

        [TestCase]
        public void Should_Not_Put_Invalid_Entity()
        {
            var questionDTO = Store.TestQuestion;

            var response = controller.Post(questionDTO);
            Assert.IsTrue(HttpStatusCode.Created == response.StatusCode);

            questionDTO.Statement = string.Empty;
            questionDTO.Statement = string.Empty;

            Assert.Throws<ArgumentException>(() => controller.Put(questionDTO));
        }

        [TestCase]
        public void Should_Put_Entity()
        {
            controller.Post(Store.TestQuestion);

            var questionDTO = Store.TestQuestion;
            questionDTO.Statement = "Boring Statement";
            questionDTO.CorrectAnswer = "Boring Answer";

            var response = controller.Put(questionDTO);

            Assert.IsTrue(HttpStatusCode.NoContent == response.StatusCode);

            var result = controller.Get().Content.ReadAsAsync<IEnumerable<QuestionDTO>>().Result.ToList();

            Assert.IsTrue(result.DoesContain(questionDTO));
            Assert.IsFalse(result.DoesContain(Store.TestQuestion));
        }

        [TestCase]
        public void Should_Throw_Error_On_Not_Existing_Key_For_Delete()
        {
            Assert.Throws<InvalidOperationException>(() => controller.Delete(Guid.NewGuid()));
        }
    }
}
