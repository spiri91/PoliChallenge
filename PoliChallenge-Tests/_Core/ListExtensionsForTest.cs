using System.Collections.Generic;
using System.Linq;

namespace PoliChallenge_Tests._Core
{
    public static class ListExtensionsForTest
    {
        public static bool IsSameByValue<T>(this IList<T> first, IList<T> second) => !first.Except(second).Any();

        public static bool HaveSameNumberOfElements<T>(this IList<T> first, IList<T> second) =>
            first.Count == second.Count;
    }
}
