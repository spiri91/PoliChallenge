using System;
using System.ComponentModel.DataAnnotations;

namespace PoliChallenge.Business.Questions
{
    public class Question
    {
        [Key]
        public Guid Key { get; set; }

        [Required]
        public Guid For { get; set; }

        [MinLength(15)]
        public string Statement { get; set; }

        [Required]
        public string Answer1 { get; set; }

        [Required]
        public string Answer2 { get; set; }

        [Required]
        public string Answer3 { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }

        public static implicit operator QuestionDTO(Question question)
        {
            return new QuestionDTO()
            {
                Key = question.Key,
                For = question.For,
                Statement = question.Statement,
                Answer1 = question.Answer1,
                Answer2 = question.Answer2,
                Answer3 = question.Answer3,
                CorrectAnswer = question.CorrectAnswer
            };
        }
    }
}
