using System.Collections.Generic;

namespace PoliChallenge.Business.Places
{
    public static class PlaceExtensions
    {
        public static IList<PlaceDTO> AsDTOs(this IList<Place> places)
        {
            var listOfDTOS = new List<PlaceDTO>();
            foreach (var x in places) listOfDTOS.Add(x);

            return listOfDTOS;
        }
    }
}