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
            Assert.IsTrue(example.OrderByDescending(x => x).ToList().IsSame(shuffledList.OrderByDescending(x => x).ToList()));
            Assert.IsTrue(shuffledList.OrderByDescending(x => x).ToList().IsSame(example.OrderByDescending(x => x).ToList()));
        }
    }
}
