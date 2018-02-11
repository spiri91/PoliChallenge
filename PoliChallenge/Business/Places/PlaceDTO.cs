using System;

namespace PoliChallenge.Business.Places
{
    using Ensure.NET;
    using PoliChallenge.Contracts;
    using System.ComponentModel.DataAnnotations;

    public class PlaceDTO : IIsEqual<PlaceDTO>
    {
        [Required]
        public Guid? Key { get; set; }

        [Required]
        [MinLength(6)]
        public string Name { get; set; }

        [Required]
        public decimal Latitude { get; set; }

        [Required]
        public decimal Longitude { get; set; }

        [Required]
        [MinLength(10)]
        public string Observations { get; set; }

        public static implicit operator Place(PlaceDTO dto)
        {
            Ensure.Condition(dto.IsValid(), new ArgumentException());

            return new Place()
            {
                Key = dto.Key ?? Guid.NewGuid(),
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Observations = dto.Observations,
                Name = dto.Name
            };
        }

        private bool IsValid()
        {
            if (string.IsNullOrWhiteSpace(Name))
                return false;

            return true;
        }

        public bool IsEqual(PlaceDTO comparator)
        {
            return Key == comparator.Key && Name == comparator.Name && Latitude == comparator.Latitude && Longitude == comparator.Longitude
                && Observations == comparator.Observations;
        }
    }
}