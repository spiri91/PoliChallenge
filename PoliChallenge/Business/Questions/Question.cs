using System;

namespace PoliChallenge.Business.Questions
{
    public class Question
    {
        public Guid Key { get; set; }

        public Guid For { get; set; }

        public string Statement { get; set; }

        public string Answer1 { get; set; }

        public string Answer2 { get; set; }

        public string Answer3 { get; set; }

        public string CorrectAnswer { get; set; }
    }
}
