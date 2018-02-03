namespace PoliChallenge_Tests
{
    interface IControllerTests<T>
    {
        void Should_Query_Collection();

        void Should_Fetch_All();

        void Should_Put_Entity();

        void Should_Not_Put_Invalid_Entity();

        void Should_Add_Entity();

        void Should_Not_Add_Invalid_Entity();

        void Should_Delete_Entity();

        void Should_Save_Changes();
    }
}
