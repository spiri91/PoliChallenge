using System;

namespace PoliChallenge.Business.Places
{
    using Ensure.NET;
    using PoliChallenge.Contracts;

    public class PlaceDTO : IIsEqual<PlaceDTO>
    {
        public Guid? Key { get; set; }

        public string Name { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

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
            // TODO Compare decimals
            return Key == comparator.Key && Name == comparator.Name && Latitude == comparator.Latitude && Longitude == comparator.Longitude
                && Observations == comparator.Observations;
        }
    }
}