using System.Collections.Generic;
using System.Linq;
using PoliChallenge.Contracts;

namespace PoliChallenge_Tests._Core
{
    public static class ListExtensionsForTest
    {
        public static bool IsSameByValue<T>(this IList<T> first, IList<T> second) where T : IIsEqual<T>
        {
            if (first.Count != second.Count)
                return false;

            for (var i = 0; i < first.Count; i++)
                if (! first[i].IsEqual(second[i]))
                    return false;

            return true;
        }

        public static bool HaveSameNumberOfElements<T>(this IList<T> first, IList<T> second) =>
            first.Count == second.Count;

        public static bool IsSame<T>(this IList<T> first, IList<T> second) => first.SequenceEqual(second);

        public static bool DoesContain<T>(this IList<T> list, T element) where T : IIsEqual<T>
        {
            foreach (var e in list)
                if (e.IsEqual(element))
                    return true;

            return false;
        }
    }
}
