using System;
using Microsoft.Ajax.Utilities;

namespace PoliChallenge.Business.Questions
{
    using Ensure.NET;
    using PoliChallenge.Contracts;
    using System.ComponentModel.DataAnnotations;

    public class QuestionDTO : IIsEqual<QuestionDTO>
    {
        [Required]
        public Guid? Key { get; set; }

        [Required]
        public Guid For { get; set; }

        [Required]
        [MinLength(12)]
        public string Statement { get; set; }

        [Required]
        [MinLength(2)]
        public string Answer1 { get; set; }

        [Required]
        [MinLength(2)]
        public string Answer2 { get; set; }

        [Required]
        [MinLength(2)]
        public string Answer3 { get; set; }

        [Required]
        [MinLength(2)]
        public string CorrectAnswer { get; set; }

        public static implicit operator Question(QuestionDTO dto)
        {
            Ensure.Condition(dto.IsValid(), new ArgumentException());

            return new Question()
            {
                Key = dto.Key ?? Guid.NewGuid(),
                For = dto.For,
                Statement = dto.Statement,
                Answer1 = dto.Answer1,
                Answer2 = dto.Answer2,
                Answer3 = dto.Answer3,
                CorrectAnswer = dto.CorrectAnswer
            };
        }

        private bool IsValid()
        {
            if (For == Guid.Empty || Statement.IsNullOrWhiteSpace() || Answer1.IsNullOrWhiteSpace() ||
                Answer2.IsNullOrWhiteSpace() || Answer3.IsNullOrWhiteSpace()
                || CorrectAnswer.IsNullOrWhiteSpace())
                return false;

            return true;
        }

        public bool IsEqual(QuestionDTO comparator)
        {
            return Key == comparator.Key && For == comparator.For && Statement == comparator.Statement && Answer1 == comparator.Answer1
                && Answer2 == comparator.Answer2 && Answer3 == comparator.Answer3 && CorrectAnswer == comparator.CorrectAnswer;
        }
    }
}