using System.Collections.Generic;

namespace PoliChallenge.Business.Questions
{
    public static class QuestionExtensions
    {
        public static IList<QuestionDTO> AsDTOs(this IList<Question> questions)
        {
            var listOfDTOS = new List<QuestionDTO>();
            foreach (var x in questions) listOfDTOS.Add(x);

            return listOfDTOS;
        }
    }
}