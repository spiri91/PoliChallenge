using System;
using System.Collections.Generic;
using PoliChallenge.Business.Questions;

namespace PoliChallenge.Business.Places
{
    public class PlaceDTO
    {
        public Guid Key { get; set; }

        public string Name { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string Observations { get; set; }

        public IList<Question> Questions { get; set; }
    }
}