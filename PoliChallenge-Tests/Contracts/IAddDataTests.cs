using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoliChallenge_Tests.Contracts
{
    public interface IAddDataTests
    {
        void Should_Add_Entity();

        void Should_Not_Add_Invalid_Entity();
    }
}
