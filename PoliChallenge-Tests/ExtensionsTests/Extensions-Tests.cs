using System.Linq;
using NUnit.Framework;
using PoliChallenge.Business._Core;
using PoliChallenge_Tests._Core;

namespace PoliChallenge_Tests.ExtensionsTests
{
    [TestFixture]
    public class Extensions_Tests
    {
        [TestCase]
        public void Should_Shuffle_List()
        {
            var example = Enumerable.Range(1, 30).ToList();
            var shuffledList = example.ToList().Shuffle(); //make deep copy of it

            Assert.AreNotSame(example, shuffledList);
            Assert.IsTrue(example.IsSame(shuffledList));
            Assert.IsTrue(shuffledList.IsSame(example));
        }
    }
}
