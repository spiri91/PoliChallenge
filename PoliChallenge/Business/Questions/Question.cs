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
