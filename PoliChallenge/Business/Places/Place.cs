using System;
using System.ComponentModel.DataAnnotations;

namespace PoliChallenge.Business.Places
{
    public class Place
    {
        [Key]
        public Guid Key { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Latitude { get; set; }

        [Required]
        public decimal Longitude { get; set; }

        [Required]
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
