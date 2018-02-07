using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoliChallenge_Tests.Contracts
{
    public interface IDeleteDataTests
    {
        void Should_Delete_Entity();

        void Should_Throw_Error_On_Not_Existing_Key_For_Delete();
    }
}
