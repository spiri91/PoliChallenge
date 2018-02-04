using System;

namespace PoliChallenge.Business.Places
{
    public class Place
    {
        public Guid Key { get; set; }

        public string Name { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string Observations { get; set; }

        public static implicit operator PlaceDTO(Place place)
        {
            return new PlaceDTO()
            {
                Key = place.Key,
                Latitude = place.Latitude,
                Longitude = place.Longitude,
                Observations = place.Observations,
                Name = place.Name
            };
        }
    }
}
