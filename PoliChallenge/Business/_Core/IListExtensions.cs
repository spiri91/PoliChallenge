using System;
using System.Collections.Generic;

namespace PoliChallenge.Business._Core
{
    public static class ListExtensions
    {
        private static readonly Random Rand = new Random();

        public static IList<T> Shuffle<T> (this IList<T> list)
        {
            int listCount = list.Count;

            while (listCount > 1)
            {
                listCount--;
                int k = Rand.Next(listCount + 1);
                T value = list[k];
                list[k] = list[listCount];
                list[listCount] = value;
            }

            return list;
        }
    }
}