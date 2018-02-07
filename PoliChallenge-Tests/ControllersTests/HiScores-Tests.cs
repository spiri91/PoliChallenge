using NUnit.Framework;
using PoliChallenge.Controllers;
using PoliChallenge_Tests.Contracts;
using PoliChallenge_Tests.Core;

namespace PoliChallenge_Tests.ControllersTests
{
    [TestFixture]
    public class HiScores_Tests : ContextDependent, IAddDataTests, IDeleteDataTests
    {
        private HiScoresController controller = new HiScoresController();

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
    }
}
